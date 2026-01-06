import React from "react";
import { moodOptions } from '../moods';

export default function EntryItem({ entry, onDelete }) {
  const moodLabel = moodOptions.find((m) => m.value === entry.mood)?.label || entry.mood;

return (
  <li key={entry.id}>
    <strong>{entry.entry_date}</strong> — Mood: {moodLabel} — {entry.feeling}
    {entry.reflection && <p>{entry.reflection}</p>}
    <button
      onClick={() => onDelete(entry.id)}
      style={{ marginTop: "5px", color: "white", background: "red" }}
    >
      Delete
    </button>
  </li>
);
}
