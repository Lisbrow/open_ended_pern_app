import { useState } from "react";
import { toast } from "sonner";
import MoodSelector from "../MoodSelector/MoodSelector";
import { getMoodScore } from "../../utils/moodUtils";
import "./MoodEntryForm.css";

export default function MoodEntryForm({ onSave }) {
  const [moodValue, setMoodValue] = useState(null);
  const [entryText, setEntryText] = useState("");

  const submitEntry = () => {
    if (!moodValue) {
      toast.error("Please select a mood before saving!");
      return;
    }

    onSave({
      id: crypto.randomUUID(),
      mood_value: moodValue,
      mood_score: getMoodScore(moodValue),
      entry_text: entryText,
      created_at: new Date().toISOString(),
    });

    // Clear form after save
    setMoodValue(null);
    setEntryText("");
  };

  return (
    <div className="MoodEntryForm">
      <h2>How are you feeling today?</h2>
      <MoodSelector value={moodValue} onChange={setMoodValue} />

      <div className="MoodEntryFormInputs">
        <h3>What's on your mind?</h3>
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write a note (optional)"
        />

        <button
          className="SaveButton"
          onClick={submitEntry}
        >
          Save entry
        </button>
      </div>
    </div>
  );
}
