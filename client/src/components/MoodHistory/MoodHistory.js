import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { getMoodEmoji, getMoodLabel } from '../../utils/moodUtils';
import './MoodHistory.css';

function MoodHistory({ entries = [], onDelete, highlightedEntryId }) {
  const entryRefs = useRef({});

  useEffect(() => {
    if (!highlightedEntryId) return;

    const el = entryRefs.current[highlightedEntryId];
    if (el) {
      el.classList.add('highlighted');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const timeout = setTimeout(() => {
        el.classList.remove('highlighted');
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [highlightedEntryId]);

  return (
    <div className="History">
      <h2>Your Journey</h2>
      <div className="HistoryList">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            ref={(el) => (entryRefs.current[entry.id] = el)}
            className="HistoryCard"
          >
            <div className="HistoryItemInner">
              <div className="HistoryEmoji">{getMoodEmoji(entry.mood_value)}</div>
              <div className="HistoryText">
                <div className="HistoryLabel">{getMoodLabel(entry.mood_value)}</div>
                {entry.entry_text && <p className="HistoryNote">{entry.entry_text}</p>}
              </div>
              <button className="DeleteButton" onClick={() => onDelete(entry.id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MoodHistory;
