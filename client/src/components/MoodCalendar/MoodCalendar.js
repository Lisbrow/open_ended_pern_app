import { getMoodEmoji } from '../../utils/moodUtils';
import './MoodCalendar.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Check if two dates are the same day
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Always return 4 full weeks ending on Saturday
function getLastFourWeeks() {
  const days = [];
  const today = new Date();

  // End on Saturday (complete current week)
  const end = new Date(today);
  end.setDate(today.getDate() + (6 - today.getDay()));

  // 28 days total
  for (let i = 27; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    days.push(d);
  }

  return days;
}


// MOOD CALENDAR COMPONENT
function MoodCalendar({ entriesByDay = {}, onEmojiClick }) {
  const today = new Date();
  const days = getLastFourWeeks();

  return (
    <div className="MoodCalendar">
      {/* Weekday headers */}
      <div className="CalendarHeader">
        {WEEKDAYS.map((day) => (
          <div key={day} className="CalendarHeaderCell">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="CalendarGrid">
        {days.map((dateObj) => {
          const dayKey = dateObj.toISOString().slice(0, 10);
          const dayData = entriesByDay[dayKey];
          const isToday = isSameDay(dateObj, today);

          return (
            // CALENDAR CELL
            <div
              key={dayKey}
              className={`CalendarCell glass-card ${isToday ? 'today' : ''}`}
            >
              {/* CALENDAR DATE */}
              <div className="CalendarDate">
                {dateObj.getDate()}
              </div>

              {/* EMOJIS FOR THE DAY */}
              <div className="CalendarEmojisContainer">
                {(dayData?.entries || []).map((entry) => (
                  // Emoji button to view entry in history
                  <button
                    key={entry.id}
                    className="CalendarEmoji"
                    onClick={() => onEmojiClick(entry)}
                    aria-label="View entry in history"
                  >
                    {getMoodEmoji(entry.mood_value)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MoodCalendar;
