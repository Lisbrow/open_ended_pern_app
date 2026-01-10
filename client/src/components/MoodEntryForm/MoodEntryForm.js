import { useState } from "react";
import MoodSelector from "../MoodSelector/MoodSelector";
import { getMoodScore } from "../../utils/moodUtils";

export default function MoodEntryForm({ onSave }) {
  const [moodValue, setMoodValue] = useState(null);
  const [entryText, setEntryText] = useState("");

  const submitEntry = () => {
    if (!moodValue) return;

    onSave({
      id: crypto.randomUUID(),
      mood_value: moodValue,
      mood_score: getMoodScore(moodValue),
      entry_text: entryText,
      created_at: new Date().toISOString(),
    });

    setMoodValue(null);
    setEntryText("");
  };

  return (
    <div className="MoodEntryForm">
      <h2>How are you feeling today?</h2>
      <MoodSelector value={moodValue} onChange={setMoodValue} />

      <h3>What's on your mind?</h3>
      <textarea
        value={entryText}
        onChange={e => setEntryText(e.target.value)}
      />

      <button
        className="PrimaryButton"
        onClick={submitEntry}
        disabled={!moodValue}
      >
        Save entry
      </button>
    </div>
  );
}
