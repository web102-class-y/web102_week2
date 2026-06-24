import { useState } from "react";
import "./GuessForm.css";

// Fuzzy matching: lowercase the text, then keep only ASCII letters and digits
// so case, whitespace, and punctuation differences are ignored.
const normalize = (s) => {
  const lower = s.toLowerCase();
  let result = "";
  for (let i = 0; i < lower.length; i++) {
    const code = lower.charCodeAt(i);
    const isDigit = code >= 48 && code <= 57;   // '0'-'9'
    const isLetter = code >= 97 && code <= 122; // 'a'-'z'
    if (isDigit || isLetter) {
      result += lower[i];
    }
  }
  return result;
};

// Guess input: the user types an answer and submits it before flipping the card.
// answer   - the correct answer for the current card
// onResult - callback to the parent with whether this guess was correct (used for streaks)
function GuessForm({ answer, onResult }) {
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("idle"); // idle | correct | incorrect

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "correct") return; // already correct: lock to avoid inflating the streak

    const isCorrect = normalize(guess) === normalize(answer);
    setStatus(isCorrect ? "correct" : "incorrect");
    onResult(isCorrect);
  };

  return (
    <form className="guess-form" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Your guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Type your answer..."
        className={`guess-input ${status}`}
        disabled={status !== "idle"}
        autoComplete="off"
      />
      <button type="submit" disabled={status === "correct"}>
        Submit
      </button>

      {status === "correct" && (
        <p className="feedback correct">Correct!</p>
      )}
      {status === "incorrect" && (
        <p className="feedback incorrect">Wrong!</p>
      )}
    </form>
  );
}

export default GuessForm;
