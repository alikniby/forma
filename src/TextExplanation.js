import React, { useState } from 'react';
import '/Users/ali/educare/src/style.css';

const TextExplanation = () => {
  const [readQuestion, setReadQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleReadQuestion = (answer) => {
    setReadQuestion(answer);
    if (answer) {
      setFeedback("Great job! Keep practicing and you'll master multiplication in no time! 😃");
    } else {
      setFeedback("It's okay! Take your time to read and understand the explanation. You've got this! 💪");
    }
  };

  return (
    <div className="text-explanation">
      <h2>Multiplication Table Explained</h2>
      <p>
       
      </p>
      <p>
       Start from a easy number like 2*2, just take 2 and add 2 to it. That's their product! 🎉
      </p>
      <p>
       
      </p>
      <p>
        Practice using the multiplication table to multiply different numbers. Before you know it, you'll be a multiplication master! 💪
      </p>
      <h3>Did you read and understand the explanation?</h3>
      <button onClick={() => handleReadQuestion(true)}>Yes</button>
      <button onClick={() => handleReadQuestion(false)}>No</button>
      {readQuestion !== null && <p>{feedback}</p>}
      {feedback === "Great job! Keep practicing and you'll master multiplication in no time! 😃" && (
        <>
        </>
      )}
    </div>
  );

  
};

export default TextExplanation;
