import { useState, forwardRef, useImperativeHandle } from "react";
import "./Card.css";

const Card = forwardRef(({ title, answer }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [entering, setEntering] = useState(true); // play the animation on the first card too

  // Expose reset(): called by the parent on card change - flip back to front + replay enter animation
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