import { motion } from "motion/react";
import "./MoodSelector.css";
import { moodOptions } from "../../utils/moodUtils";

export default function MoodSelector({ value, onChange }) {
  return (
    <div className="MoodGrid">
      {moodOptions.map((mood) => {
        const isActive = value === mood.value;

        return (
          <motion.button
            key={mood.value}
            type="button"
            className={`MoodOption ${isActive ? "active" : ""}`}
            onClick={() => onChange(mood.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="emoji">{mood.emoji}</span>
            <span className="label">{mood.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
