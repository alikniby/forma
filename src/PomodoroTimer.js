import React, { useState, useEffect } from 'react';

const PomodoroTimer = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRevealed, setTimeRevealed] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timerRunning, timeLeft]);

  const setTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setTimeRevealed(false);
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const restartTimer = () => {
    setTimerRunning(false);
    setTimeLeft(null);
  };

  const revealTime = () => {
    setTimeRevealed(true);
  };

  return (
    <div>
      {showTimer && (
        <>
          <h2>Pomodoro Timer</h2>
          <button onClick={() => setTimer(5)}>5 minutes</button>
          <button onClick={() => setTimer(10)}>10 minutes</button>
          <button onClick={() => setTimer(25)}>25 minutes</button>
          <br />
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={restartTimer}>Restart</button>
          <button onClick={() => setShowTimer(false)}>Close</button>
          <br />
          <div onClick={revealTime}>
            {timeRevealed ? (
              <p>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
            ) : (
              <p>Click to reveal time</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;
