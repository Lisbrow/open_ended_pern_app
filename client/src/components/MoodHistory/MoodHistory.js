import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { FaTrash } from "react-icons/fa";
import { getMoodEmoji, getMoodLabel, getMoodCategory } from '../../utils/moodUtils';
import './MoodHistory.css';

function MoodHistory({ entries = [], onDelete, highlightedEntryId }) {
  const entryRefs = useRef({});

  useEffect(() => {
    // Highlight and scroll to the specified entry
    if (!highlightedEntryId) return;

    const el = entryRefs.current[highlightedEntryId];
    if (el) {
      el.classList.add('highlighted');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Remove highlight after a delay
      const timeout = setTimeout(() => {
        el.classList.remove('highlighted');
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [highlightedEntryId]);

  return (
    <div className="History">
      {entries.length === 0 ? (
        // No entries message if history is empty
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="Content glass-card"
          style={{ padding: '2.5rem', textAlign: 'center' }}
        >
          <div style={{ fontSize: '2rem', paddingBottom: '1rem' }}>✨</div>
          <h3>No entries yet</h3>
          <p className="subtext">
            Start tracking your mood to see your history here
          </p>
        </motion.div>
      ) : (
        // MOOD HISTORY LIST
        <div className="HistoryList">
          {entries.map((entry) => (
            // MOOD HISTORY CARD ANIMATION
            <motion.div
              key={entry.id}
              ref={(el) => (entryRefs.current[entry.id] = el)}
              className="HistoryCardContainer glass-card"
            >
              {/* MOOD HISTORY CARD */}
              <div className="HistoryCard">

                {/* EMOJI AND LABEL */}
                <div className="HistoryEmoji">{getMoodEmoji(entry.mood_value)}</div>
                <div className="HistoryText">
                  <h4
                    className={`HistoryLabel ${getMoodCategory(entry.mood_score)}`}
                  >
                    {getMoodLabel(entry.mood_value)}
                  </h4>

                  {/* ENTRY TEXT */}
                  {entry.entry_text && <p className="EntryText">{entry.entry_text}</p>}
                </div>
                
                {/* DELETE BUTTON */}
                <button className="DeleteButton" onClick={() => onDelete(entry.id)}>
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoodHistory;
