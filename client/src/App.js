import React, { useEffect, useState } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { moodOptions } from './moods';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [filterMood, setFilterMood] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // DEFAULT: newest first

  const fetchEntries = async (mood = '') => {
    let url = 'http://localhost:5000/entries';
    if (mood) url += `?mood=${mood}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // ADD Entry
  const handleAdd = (entry) => {
    setEntries([entry, ...entries]);
  };

  // DELETE entry
  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // FILTER by mood
  const handleFilterChange = (e) => {
    setFilterMood(e.target.value);
    fetchEntries(e.target.value);
  };

  // SORT desc or asc
  const handleSort = (order) => {
  setSortOrder(order);
  const sorted = [...entries].sort((a, b) => {
    const dateA = new Date(a.entry_date);
    const dateB = new Date(b.entry_date);
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
  setEntries(sorted);
};


  return (
    <div className='App'>
      <h1>Mood Ledger</h1>
      <p>Your personal mood journal</p>

      <h2>Add New Entry</h2>
      <EntryForm onAdd={handleAdd} />

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
      <EntryList
        entries={entries}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
