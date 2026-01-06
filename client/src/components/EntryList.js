import React from "react";
import EntryItem from "./EntryItem";

export default function EntryList({ entries, onDelete }) {
  if (entries.length === 0) return <p>No entries yet</p>;

  return (
    <ul>
      {entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </ul>
  );
}
