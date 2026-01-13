import { useMemo } from "react";
import { groupEntriesByDay, calculateStreaks, getMostCommonMoods } from "../../utils/insightUtils";
import { getMoodEmoji, getMoodLabel } from "../../utils/moodUtils";

import MoodCalendar from "../MoodCalendar/MoodCalendar";

import "./MoodInsights.css";

function MoodInsights({ entries, onEmojiClick }) {
  // Last 4 weeks of entries
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  const recentEntries = entries.filter(e => new Date(e.created_at) >= fourWeeksAgo);

  const entriesByDay = useMemo(() => groupEntriesByDay(recentEntries), [recentEntries]);
  const streaks = useMemo(() => calculateStreaks(entries), [entries]);
  const commonMoods = useMemo(() => getMostCommonMoods(entries), [entries]);

  if (!entries?.length) return null;

  return (
    <div className="MoodInsightsContainer">
      <div className="MoodInsights">
        <p className="Streaks">🔥 <strong>{streaks.current}</strong> day streak</p>
      </div>
      
      <MoodCalendar
        entriesByDay={entriesByDay}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
}

export default MoodInsights;
