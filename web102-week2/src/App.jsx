import { useState, useRef } from 'react'

import './App.css'

import Card from './components/Card';

import { questions } from './QuestionBank';

function App() {
  const [bank, setBank] = useState(questions);
  const [history, setHistory] = useState([]);
  const [nowIndex, setNowIndex] = useState(0);
  const cardRef = useRef(null);                  // 用来调用 Card 的 reset()

  const handleForward = () => {
    // 不在最新卡：沿 history 往“更新”方向走一格，不抽新卡
    if (nowIndex > 0) {
      setNowIndex(nowIndex - 1);
      cardRef.current?.reset();
      return;
    }

    // 已经在最新卡：抽一张全新的随机卡
    if (bank.length === 0) return;
    const i = Math.floor(Math.random() * bank.length);
    const picked = bank[i];
    setBank(bank.filter((_, idx) => idx !== i));
    setHistory([picked, ...history]);
    setNowIndex(0);
    cardRef.current?.reset();
  };

  const handleBack = () => {
    if (nowIndex < history.length - 1) {
      setNowIndex(nowIndex + 1);
      cardRef.current?.reset();
    }
  };

  const current = history[nowIndex];


  return (
    <>
      <header className="card-set-header">
        <h1>Cybersecurity Auditd Review</h1>
        <p>Study Linux auditd and host-based intrusion detection concepts.</p>
        <p>Total cards: {questions.length}</p>
      </header>

      <div style={{ height: "400px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {current ? (
          <Card ref={cardRef} title={current.title} answer={current.answer} />
        ) : (
          <p>Click "Next" to get started!!</p>
        )}
      </div>

      <div className="buttons">
        <button onClick={handleBack} disabled={nowIndex >= history.length - 1}>
          Back
        </button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button onClick={handleForward} disabled={nowIndex === 0 && bank.length === 0}>
          Next
        </button>
      </div>
    </>
  )
}

export default App
