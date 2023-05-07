import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from '/Users/ali/educare/src/Chatbot.js';
import Modal from 'react-modal';
import './multistyle.css';
import MathQuiz from '/Users/ali/educare/src/MathQuiz.js'; // Make sure to import the MathQuiz component

Modal.setAppElement('#root');


const MultiplicationQuiz = () => {
  const [level, setLevel] = useState('normal');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(30);
  const TIMER_DURATION = 30;
  const [showCurrentNumber, setShowCurrentNumber] = useState(false);
  const [countHelp, setCountHelp] = useState(5);
  const [info, setInfo] = useState({
    correct: 0,
    wrong: 0,
    hit: 0,
  });
  const [message, setMessage] = useState('');
  const [numberRandom1, setNumberRandom1] = useState(0);
  const [numberRandom2, setNumberRandom2] = useState(0);
  const [operator, setOperator] = useState('*');
  const [showModal, setShowModal] = useState(false);
  const [showMathQuiz, setShowMathQuiz] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [alternatives, setAlternatives] = useState({
    numberA: 0,
    numberB: 0,
    numberC: 0,
    numberD: 0,
    
  });
  const handleBoringClick = () => {
    setShowModal(false);
    setShowMathQuiz(true);
  };
  useEffect(() => {
    if (timerRunning && timer > 0) {
      const timeoutId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [timer, timerRunning]);

  useEffect(() => {
    if (timer === 0) {
      setTimerRunning(false);
    }
  }, [timer]);
  

  const play = (level) => {
    setLevel(level);
    setInfo({
      correct: 0,
      wrong: 0,
      hit: 0,
    });
    setCountHelp(5);
    setTimer(TIMER_DURATION);
    setTimerRunning(true);
    chooseNumber();
  };
  const chooseNumber = useCallback(() => {
    const difficulty = (level) => {
      let maxNumber, range;

      if (level === 'easy') {
        maxNumber = 5;
        range = 5;
      } else if (level === 'normal') {
        maxNumber = 10;
        range = 10;
      } else {
        maxNumber = 20;
        range = 30;
      }

      return { maxNumber, range };
    };
   
    
    const setCurrentAlternative = (currentAlternative, currentNumber, range) => {
      let alternatives = {
        numberA: 0,
        numberB: 0,
        numberC: 0,
        numberD: 0,
      };

      alternatives[currentAlternative] = currentNumber;

      for (const alternative in alternatives) {
        if (alternatives[alternative] === 0) {
          let alternativeNumber = 0;
          do {
            alternativeNumber = randomNumber(currentNumber - range, currentNumber + range);
          } while (
            alternativeNumber === currentNumber ||
            alternativeNumber < 0 ||
            Object.values(alternatives).includes(alternativeNumber)
          );
          alternatives[alternative] = alternativeNumber;
        }
      }

      setAlternatives(alternatives);
    };

    const { maxNumber, range } = difficulty(level);
    const numberRandom1 = randomNumber(1, maxNumber);
    const numberRandom2 = randomNumber(1, maxNumber);
    if (numberRandom1 > numberRandom2) {
      setNumberRandom1(numberRandom1);
      setNumberRandom2(numberRandom2);
    } else {
      setNumberRandom1(numberRandom2);
      setNumberRandom2(numberRandom1);
    }
    
    const operator = '*';
    setOperator(operator);
    
    const currentNumber = applyCalc(numberRandom1, numberRandom2, operator);
    setCurrentNumber(currentNumber);
    
    const arrayAlternative = ['numberA', 'numberB', 'numberC', 'numberD'];
    const currentAlternative = arrayAlternative[randomNumber(0, arrayAlternative.length)];
    
    setCurrentAlternative(currentAlternative, currentNumber, range);
  }, [level]);
  useEffect(() => {
  chooseNumber();
  }, [chooseNumber]);
  
  const randomNumber = useCallback((min, max) => {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number > 0 ? number : randomNumber(min, max);
  }, [level]);
  
  const applyCalc = (a, b, c) => {
  let result = 0;
  switch (c) {
  case '*':
  result = a * b;
  break;
  default:
  break;
  }
  return result;
  };
  
  const chooseAlternative = (alternativeValue) => {
    if (alternativeValue === currentNumber) {
      setAnimateFlamingo(true);
      setFeedback(getRandomFeedback());
  let newCorrect = info.correct + 1;
  let newHit = info.hit + 1;
  if (showCurrentNumber) {
    setMessage('Good');
  } else {
    if (newHit < 5) {
      setMessage('Great');
    } else if (newHit > 4 && newHit < 10) {
      setMessage('Awesome');
    } else {
      setMessage('Unbelievable');
    }
  }


  setInfo({
    ...info,
    correct: newCorrect,
    hit: newHit,
  });
  setShowCurrentNumber(false);
  chooseNumber();
} else {
  let newWrong = info.wrong + 1;

  setMessage('Ops, are you sure?');
    setInfo({
      ...info,
      wrong: newWrong,
      hit: 0,
    });
    setAnimateFlamingo(false); // Move this line here
  }
  if (info.hit === 5 && !showModal) {
    console.log("showModal value before update:", showModal);
    setShowModal(true);
    console.log("showModal value after update:", showModal);
  }
  
};
const help = () => {
if (countHelp > 0) {
const correctAlternative = Object.keys(alternatives).find((key) => alternatives[key] === currentNumber);
const incorrectAlternatives = Object.keys(alternatives).filter((key) => key !== correctAlternative);
const alternativesToRemove = incorrectAlternatives.slice(0, 2);
const updatedAlternatives = { ...alternatives };
alternativesToRemove.forEach((alternative) => {
  delete updatedAlternatives[alternative];
});

setAlternatives(updatedAlternatives);
setCountHelp(countHelp - 1);
}
};
const [animateFlamingo, setAnimateFlamingo] = useState(false);
const [feedback, setFeedback] = useState('');

const getRandomFeedback = () => {
const feedbackList = ['Great job!', 'Awesome!', 'Keep it up!', 'Amazing!'];
const randomIndex = Math.floor(Math.random() * feedbackList.length);
return feedbackList[randomIndex];
};



return (
  <>
    {showMathQuiz ? (
      <MathQuiz />
    ) : (
      <div className="multiplication-quiz">
        <div className="header">
          <div className="info">
            Correct: {info.correct} | Wrong: {info.wrong} | Tries: {info.hit}
          </div>
          <div className="timer">Time: {timer}s</div>
        </div>
        {!timerRunning && (
          <div className="difficulty">
            <button onClick={() => play('easy')}>Easy</button>
            <button onClick={() => play('normal')}>Normal</button>
            <button onClick={() => play('hard')}>Hard</button>
          </div>
        )}
        {info.correct === 5 && !showModal && (
          <Modal
            isOpen={!showModal}
            onRequestClose={() => setShowModal(false)}
            className="Modal"
            overlayClassName="Overlay"
          >
            <h2>Is this boring?</h2>
            <button onClick={handleBoringClick}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </Modal>
        )}
        {timerRunning && (
          <>
            <div className="question">
              {numberRandom1} {operator} {numberRandom2}
            </div>
            <div className="alternatives">
              {Object.keys(alternatives).map((key) => (
                <button
                  key={key}
                  className="alternative"
                  onClick={() => chooseAlternative(alternatives[key])}
                >
                  {alternatives[key]}
                </button>
              ))}
            </div>
            <div className="message">{message}</div>
            <button className="help" onClick={help} disabled={countHelp === 0}>
              Help ({countHelp})
            </button>
            <Chatbot />
            {animateFlamingo && (
              <>
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjg5NjMxNjJkNWEzNjU4ZmQwZTEzZGYwNzk4MmNhYmY3ZDc0MjM3YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/J5jVef8Qy84gjWBGll/giphy.gif"
                  alt="flamingo"
                  style={{ width: '50px' }}
                />
                <p>{feedback}</p>
              </>
            )}
          </>
        )}
        <Link to="/MathQuiz">
  <button>Is this boring? Go to next Quiz</button>
</Link>

      </div>
      
    )}
  </>
);
}
export default MultiplicationQuiz;






