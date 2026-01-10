import { motion, AnimatePresence } from "motion/react";
import { getMoodEmoji, getMoodLabel } from "../../utils/moodUtils";
import "./MoodEntryDrawer.css";

function MoodEntryDrawer({ entry, onClose }) {
  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          className="EntryDrawerOverlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="EntryDrawer"
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="DrawerHeader">
              <span className="DrawerEmoji">{getMoodEmoji(entry.mood_value)}</span>
              <span className="DrawerLabel">{getMoodLabel(entry.mood_value)}</span>
            </div>

            {entry.entry_text && (
              <p className="DrawerText">{entry.entry_text}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MoodEntryDrawer;
