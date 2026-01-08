import React, { useState } from 'react';
import { moodOptions } from '../MoodSelector/MoodSelector';

export default function MoodEntryForm({ onAdd }) {
  const [entryDate, setEntryDate] = useState('');
  const [mood, setMood] = useState(4);
  const [feeling, setFeeling] = useState('');
  const [reflection, setReflection] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      entry_date: entryDate,
      mood: parseInt(mood),
      feeling,
      reflection,
    };

    try {
      const res = await fetch('http://localhost:5000/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) throw new Error('Failed to create entry');

      const created = await res.json();
      onAdd(created); // pass up to App
      setEntryDate('');
      setMood(4);
      setFeeling('');
      setReflection('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:{' '}
        <input
          type='date'
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Mood:{' '}
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        >
          {moodOptions.map((m) => (
            <option
              key={m.value}
              value={m.value}
            >
              {m.label}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Feeling:{' '}
        <input
          type='text'
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Reflection:{' '}
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
      </label>
      <br />
      <button type='submit'>Add Entry</button>
    </form>
  );
}
