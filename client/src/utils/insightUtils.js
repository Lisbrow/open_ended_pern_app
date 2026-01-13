// Group entries by day
export function groupEntriesByDay(entries) {
  return entries.reduce((acc, entry) => {
    const day = entry.created_at.slice(0, 10);

    if (!acc[day]) {
      acc[day] = {
        date: day,
        entries: [],
      };
    }

    acc[day].entries.push(entry);
    return acc;
  }, {});
}


// Calculate current and longest streak (consecutive days with entries)
export function calculateStreaks(entries) {
  if (!entries.length) return { current: 0, longest: 0 };

  const days = [...new Set(entries.map((e) => e.created_at.slice(0, 10)))].sort();

  let current = 1;
  let longest = 1;

  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return { current, longest };
}

// Color by mood score
export function getDaySentiment(score) {
  if (score >= 4) return "positive";
  if (score === 3) return "neutral";
  return "negative";
}
