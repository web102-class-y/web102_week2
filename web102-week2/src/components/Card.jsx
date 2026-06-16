import { useState, forwardRef, useImperativeHandle } from "react";
import "./Card.css";

const Card = forwardRef(({ title, answer }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [entering, setEntering] = useState(true); // 首张卡挂载时也播放动画

  // 对外暴露 reset()：父组件换卡时调用 —— 翻回正面 + 触发入场动画
  useImperativeHandle(ref, () => ({
    reset() {
      setIsFlipped(false);
      setEntering(true);
    },
  }));

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`card ${entering ? "card-enter" : ""}`}
      onClick={handleFlip}
      onAnimationEnd={() => setEntering(false)}
    >
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <h3>{title}</h3>
        </div>
        <div className="card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
});

export default Card;