import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { motion } from "motion/react";
import { FaSmileBeam, FaMoon, FaSun } from "react-icons/fa";
import MoodEntryForm from './components/MoodEntryForm/MoodEntryForm';
import MoodHistory from './components/MoodHistory/MoodHistory';
import { moodOptions } from './components/MoodSelector/MoodSelector';
import './App.css';

const api = 'http://localhost:5000/entries';

function App() {
  const [entries, setEntries] = useState([]);
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
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark");
    }
  }, []);

  // ADD Entry
  const handleAdd = (entry) => {
    try {
      setEntries([entry, ...entries]);

      // Notification
      toast.success('Entry saved!', {
        description: 'Your mood has been recorded.',
      });
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

  // TOGGLE Dark Mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
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
        transition={{ duration: 0.5 }}
        className='glass-card'
      >
        <div className='HeaderContainer'>
          <div className='HeaderLogo'>
          <h1><FaSmileBeam className='LogoIcon' /> Mood Ledger</h1>
          <p>mood by mood, day by day</p>
          </div>
          <button
            className='DarkModeToggleIcon'
            onClick={toggleDarkMode}
            aria-label='Toggle Dark Mode'
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </motion.header>

      <h2>Add New Entry</h2>
      <MoodEntryForm onAdd={handleAdd} />

      <h2>Filter by Mood</h2>
      <select
        value={filterMood}
        onChange={handleFilterChange}
      >
        <option value=''>All</option>
        {moodOptions.map((m) => (
          <option
            key={m.value}
            value={m.value}
          >
            {m.label}
          </option>
        ))}
      </select>

      <h2>Entries</h2>
      <div>
        <button onClick={() => handleSort('asc')}>Sort Oldest → Newest</button>
        <button onClick={() => handleSort('desc')}>Sort Newest → Oldest</button>
      </div>
      <MoodHistory
        entries={entries}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
