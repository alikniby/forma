import React, { useState } from 'react';
import Chatbot from '/Users/ali/educare/src/Chatbot.js';


const questions = [
  {
    question: 'What is the value of x in the equation 2x + 6 = 14?',
    answer: '4',
  },
  {
    question: 'What is the value of y in the equation 3y - 9 = 12?',
    answer: '7',
  },
  {
    question: 'What is the value of z in the equation 5z + 10 = 35?',
    answer: '5',
  },
];

const POINTS_PER_QUESTION = 10;
const LEVEL_BEGINNER = 'beginner';
const LEVEL_INTERMEDIATE = 'intermediate';
const LEVEL_ADVANCED = 'advanced';
const EMOJI_CHILD = '🧒';
const EMOJI_MAN = '👨';
const EMOJI_OLD_MAN = '🧓';
const EMOJI_PROFESSOR = '👴';

const Exercises = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(LEVEL_BEGINNER);
  const [emoji, setEmoji] = useState(EMOJI_CHILD);

  const checkAnswer = () => {
    const isCorrect = questions[currentQuestion].answer === userAnswer.trim();
    if (isCorrect) {
      setShowResult(true);
      setPoints(points + POINTS_PER_QUESTION);
      switch (level) {
        case LEVEL_BEGINNER:
          setLevel(LEVEL_INTERMEDIATE);
          setEmoji(EMOJI_MAN);
          break;
        case LEVEL_INTERMEDIATE:
          setLevel(LEVEL_ADVANCED);
          setEmoji(EMOJI_OLD_MAN);
          break;
        default:
          setEmoji(EMOJI_PROFESSOR);
          break;
      }
    } else {
      setShowResult(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setShowResult(false);
    }
  };
  const plotData = [
    {
      x: [0, 1, 2, 3, 4, 5],
      y: [0, 1, 2, 3, 4, 5],
      type: 'scatter',
      mode: 'lines+points',
      marker: { color: 'red' },
    },
  ];
  

  return (
    <div className="Exercises">
      <h2>
        Algebra Exercises {emoji} ({level}) - Points: {points}
      </h2>
      <p>{questions[currentQuestion].question}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button onClick={checkAnswer}>Check Answer</button>
      {showResult && <p>You are right!</p>}
      {!showResult && showResult !== null && (
        <p>Incorrect, please try again.</p>
      )}
      <button onClick={nextQuestion}>Next Question</button>
    
      
      <Chatbot />
    </div>
  );
};

export default Exercises;
