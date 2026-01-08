import React from "react";
import MoodEntry from "../MoodEntry/MoodEntry";

export default function MoodHistory({ entries, onDelete }) {
  if (entries.length === 0) return <p>No entries yet</p>;

  return (
    <ul>
      {entries.map((entry) => (
        <MoodEntry key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </ul>
  );
}
