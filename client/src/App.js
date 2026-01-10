import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { FaSmileBeam, FaMoon, FaSun } from 'react-icons/fa';
import Tabs from './components/Tabs/Tabs';
import MoodEntryForm from './components/MoodEntryForm/MoodEntryForm';
import MoodHistory from './components/MoodHistory/MoodHistory';
import MoodInsights from './components/MoodInsights/MoodInsights';
import './App.css';

const api = 'http://localhost:5000/entries';

function App() {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [highlightedEntryId, setHighlightedEntryId] = useState(null);
  const [filterMood, setFilterMood] = useState('');
  const [isDark, setIsDark] = useState(false);

  const fetchEntries = async (mood = '') => {
    const url = mood ? `${api}?mood=${mood}` : api;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch entries on mount
    fetchEntries();

    // Check system dark mode preference
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('dark');
    }
  }, []);

  // SAVE Entry
  const handleSave = async (entry) => {
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!res.ok) throw new Error('Failed to save entry');

      const savedEntry = await res.json();

      setEntries((prev) => [savedEntry, ...prev]);

      toast.success('Entry saved!', {
        description: 'Your mood has been recorded.',
      });

      setActiveTab('history');
    } catch (err) {
      console.error(err);
      toast.error('Could not save entry');
    }
  };

  // DELETE entry
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${api}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete entry');

      // Remove entry from state
      setEntries((prev) => prev.filter((e) => e.id !== id));

      // Notification
      toast('Entry deleted');
    } catch (err) {
      console.error(err);
      toast('Failed to delete entry');
    }
  };

  // FILTER by mood
  const handleFilterChange = (e) => {
    setFilterMood(e.target.value);
    fetchEntries(e.target.value);
  };

  // SORT desc or asc
  const handleSort = (order) => {
    const sorted = [...entries].sort((a, b) => {
      const dateA = new Date(a.entry_date);
      const dateB = new Date(b.entry_date);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setEntries(sorted);
  };

  // EMOJI click in calendar
  const handleEmojiClick = (entry) => {
    setActiveTab('history');
    setHighlightedEntryId(entry.id);
  };

  // TOGGLE Dark Mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark');
  };

  return (
    <div className='App'>
      {/* BACKGROUND with overlay */}
      <div className='Background'>
        <div className='BackgroundOverlay' />
      </div>
      <Toaster />

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='glass-card HeaderContainer'
      >
        <div className='HeaderLogo'>
          <h1>
            <FaSmileBeam className='LogoIcon' /> Mood Ledger
          </h1>
          <p>mood by mood, day by day</p>
        </div>
        <button
          className='DarkModeToggleIcon'
          onClick={toggleDarkMode}
          aria-label='Toggle Dark Mode'
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
      </motion.header>

      {/* TABS */}
      <Tabs
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);

          // Reset highlight when tab is manually switched
          if (tab !== 'history') {
            setHighlightedEntryId(null);
          }
        }}
      />

      {/* MAIN CONTENT */}
      <AnimatePresence mode='wait'>
        {activeTab === 'today' && (
          <motion.div
            key='today'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='Content glass-card'
          >
            <MoodEntryForm onSave={handleSave} />
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key='history'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='Content glass-card'
          >
            <MoodHistory
              entries={entries}
              onDelete={handleDelete}
              highlightedEntryId={highlightedEntryId}
            />
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            key='insights'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='Content glass-card'
          >
            <MoodInsights
              entries={entries}
              onEmojiClick={handleEmojiClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
