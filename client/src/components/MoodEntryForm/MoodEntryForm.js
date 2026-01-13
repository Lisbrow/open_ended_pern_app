import { useState } from "react";
import { toast } from "sonner";
import MoodSelector from "../MoodSelector/MoodSelector";
import { getMoodScore } from "../../utils/moodUtils";
import "./MoodEntryForm.css";

export default function MoodEntryForm({ onSave }) {
  const [moodValue, setMoodValue] = useState(null);
  const [entryText, setEntryText] = useState("");

  // SUBMIT entry
  const submitEntry = () => {
    // Error message if no mood selected
    if (!moodValue) {
      toast.error("Please select a mood before saving!");
      return;
    }

    // Call onSave prop with new entry data
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
    // MOOD ENTRY FORM
    <div className="MoodEntryForm">
      <h2>How are you feeling today?</h2>
      
      {/* MOOD SELECTION GRID */}
      <MoodSelector value={moodValue} onChange={setMoodValue} />

      {/* TEXTAREA AND SAVE BUTTON */}
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
