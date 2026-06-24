import { useState, useRef } from 'react'

import './App.css'

import Card from './components/Card';
import GuessForm from './components/GuessForm';

import { questions } from './QuestionBank';

function App() {
  const [nowIndex, setNowIndex] = useState(0);     // index of the current card in the ordered list
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const cardRef = useRef(null);                     // used to call Card's reset()

  const current = questions[nowIndex];

  // Move forward/back through the fixed-order list - no random draw, no wrap-around
  const goTo = (index) => {
    setNowIndex(index);
    cardRef.current?.reset();
  };

  const handleBack = () => {
    if (nowIndex > 0) goTo(nowIndex - 1);
  };

  const handleForward = () => {
    if (nowIndex < questions.length - 1) goTo(nowIndex + 1);
  };

  // Receive the result from GuessForm and update the current / longest streak
  const handleResult = (isCorrect) => {
    if (isCorrect) {
      const next = currentStreak + 1;
      setCurrentStreak(next);
      setLongestStreak((max) => Math.max(max, next));
    } else {
      setCurrentStreak(0);
    }
  };

  return (
    <>
      <header className="card-set-header">
        <h1>Cybersecurity Auditd Review</h1>
        <p>Study Linux auditd and host-based intrusion detection concepts.</p>
        <p>Total cards: {questions.length}</p>
        <p className="streaks">
          Current streak: <strong>{currentStreak}</strong>
          &nbsp;|&nbsp;
          Longest streak: <strong>{longestStreak}</strong>
        </p>
      </header>

      <div style={{ height: "400px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card ref={cardRef} title={current.title} answer={current.answer} />
      </div>

      {/* key={nowIndex} remounts the form on card change so input and feedback reset automatically */}
      <GuessForm key={nowIndex} answer={current.answer} onResult={handleResult} />

      <div className="buttons">
        <button onClick={handleBack} disabled={nowIndex === 0}>
          Back
        </button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button onClick={handleForward} disabled={nowIndex === questions.length - 1}>
          Next
        </button>
      </div>
    </>
  )
}

export default App
