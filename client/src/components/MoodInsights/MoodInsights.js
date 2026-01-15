import { useMemo } from "react";
import { groupEntriesByDay, calculateStreaks } from "../../utils/insightUtils";

import MoodCalendar from "../MoodCalendar/MoodCalendar";
import "./MoodInsights.css";

// 4 weeks (28 days) of entries with streaks
function MoodInsights({ entries = [], onEmojiClick }) {
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  // Filter entries to last 4 weeks
  const recentEntries = entries.filter(
    e => new Date(e.created_at) >= fourWeeksAgo
  );

  // Group entries by day for calendar display
  const entriesByDay = useMemo(
    () => groupEntriesByDay(recentEntries),
    [recentEntries]
  );

  // Calculate streaks
  const streaks = useMemo(
    () => calculateStreaks(entries),
    [entries]
  );

  return (
    <div className="MoodInsightsContainer">
      {entries.length > 0 ? (
        <div className="MoodInsights">
          <p className="Streaks">
            🔥 <strong>{streaks.current}</strong> day streak
          </p>
        </div>
      ) : (
        // Show message if no entries
        <p className="EmptyStreakHint">
          Start logging to build your streak
        </p>
      )}

      <MoodCalendar
        entriesByDay={entriesByDay}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
}

export default MoodInsights;
