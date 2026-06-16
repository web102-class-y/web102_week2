import { useState } from 'react'

import './App.css'

import Card from './components/Card';

import { questions } from './QuestionBank';

function App() {
  const [bank, setBank] = useState(questions);   // 剩余题库
  const [history, setHistory] = useState([]);    // 看过的卡片，最新的在 index 0
  const [nowIndex, setNowIndex] = useState(0);   // 当前显示 history 里的哪一张

  const handleForward = () => {
    if (bank.length === 0) return;                       // 题库空了就不抽
    if (nowIndex > 0) {
      setNowIndex(Math.max(0, nowIndex - 1));
    }


    const i = Math.floor(Math.random() * bank.length);   // 随机选一个下标
    const picked = bank[i];
    setBank(bank.filter((_, idx) => idx !== i));         // 从题库删除这一张
    setHistory([picked, ...history]);                    // 加到 history 开头

    setNowIndex(0);
  };

  const handleBack = () => {
    if (nowIndex < history.length - 1) {
      setNowIndex(nowIndex + 1);
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
          <Card title={current.title} answer={current.answer} />
        ) : (
          <p>Click "Next" to get started!!</p>
        )}
      </div>

      <div className="buttons">
        <button onClick={handleBack} disabled={nowIndex >= history.length - 1}>
          Back
        </button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button onClick={handleForward} disabled={bank.length === 0}>
          Next
        </button>
      </div>
    </>
  )
}

export default App
