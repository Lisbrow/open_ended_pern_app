export const moodOptions = [
    // Very Positive
  { value: "ecstatic", emoji: "🤩", label: "Ecstatic", score: 5 },
  { value: "joyful", emoji: "😄", label: "Joyful", score: 5 },
  { value: "loved", emoji: "🥰", label: "Loved", score: 5 },
  { value: "excited", emoji: "🎉", label: "Excited", score: 5 },
  { value: "grateful", emoji: "🙏", label: "Grateful", score: 5 },

  // Positive
  { value: "happy", emoji: "😊", label: "Happy", score: 4 },
  { value: "relaxed", emoji: "😌", label: "Relaxed", score: 4 },
  { value: "content", emoji: "☺️", label: "Content", score: 4 },
  { value: "peaceful", emoji: "😇", label: "Peaceful", score: 4 },
  { value: "calm", emoji: "🧘", label: "Calm", score: 4 },

  // Neutral
  { value: "okay", emoji: "🙂", label: "Okay", score: 3 },
  { value: "meh", emoji: "😐", label: "Meh", score: 3 },
  { value: "tired", emoji: "😴", label: "Tired", score: 3 },
  { value: "bored", emoji: "😑", label: "Bored", score: 3 },
  { value: "uncertain", emoji: "🤔", label: "Uncertain", score: 3 },

  // Negative
  { value: "sad", emoji: "😢", label: "Sad", score: 2 },
  { value: "lonely", emoji: "😔", label: "Lonely", score: 2 },
  { value: "stressed", emoji: "😰", label: "Stressed", score: 2 },
  { value: "anxious", emoji: "😟", label: "Anxious", score: 2 },
  { value: "frustrated", emoji: "😤", label: "Frustrated", score: 2 },

  // Very Negative
  { value: "angry", emoji: "😠", label: "Angry", score: 1 },
  { value: "heartbroken", emoji: "💔", label: "Heartbroken", score: 1 },
  { value: "overwhelmed", emoji: "😵", label: "Overwhelmed", score: 1 },
  { value: "devastated", emoji: "😭", label: "Devastated", score: 1 },
  { value: "disappointed", emoji: "😞", label: "Disappointed", score: 1 }
];

export function getMoodOption(value) {
  return moodOptions.find(m => m.value === value);
}

export function getMoodEmoji(value) {
  return getMoodOption(value)?.emoji ?? "❓";
}

export function getMoodLabel(value) {
  return getMoodOption(value)?.label ?? value;
}

export function getMoodScore(value) {
  return getMoodOption(value)?.score ?? 3;
}

export function getMoodCategory(score) {
  if (score >= 4) return 'positive';
  if (score <= 2) return 'negative';
  return 'neutral';
}

export function moodToEmoji(avg) {
  if (avg >= 4.5) return '😄 Very Positive'; // very positive
  if (avg >= 3.5) return '😊 Positive'; // positive
  if (avg >= 2.5) return '😐 Neutral'; // neutral
  if (avg >= 1.5) return '😕 Low'; // low
  return '😞 Very Low'; // very low
}