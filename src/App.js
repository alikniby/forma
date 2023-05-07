import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import MultiplicationQuiz from './MultiplicationQuiz.js';
import ADHDQuestions from './ADHDQuestions.js';
import './App.css';
import Exercises from './Exercises.js';
import PomodoroTimer from './PomodoroTimer.js';
import AlgebraCourse from './AlgebraCourse.js';
import MathQuiz from './MathQuiz.js';

import Course from './course.js';




const Navigation = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <nav>
      <Link to="/adhd-questions"> Start</Link>
      <Link to="/">Profile</Link>
      <Link to="/AlgebraCourse"> Algebra</Link>
      <Link to="/multiplication-quiz">Math Quiz</Link>
      <Link to="/exercises"> Algebra Quiz</Link>
     
      <button
        className="overlay__btn overlay__btn--transparent focus-timer-btn"
        onClick={() => setShowContent(!showContent)}
      >
        Focus timer
      </button>
      {showContent && <PomodoroTimer />}
    </nav>
  );
};

function App() {
  const [timerFinished, setTimerFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Set the loading time in milliseconds

    return () => clearTimeout(timer);
  }, []);

  const motivationalQuote = "Believe in yourself! You can improve your focus and attention with practice.";

  return (
    <Router>
      {isLoading ? (
        <div className="loading-container">
          <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjg5NjMxNjJkNWEzNjU4ZmQwZTEzZGYwNzk4MmNhYmY3ZDc0MjM3YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/J5jVef8Qy84gjWBGll/giphy.gif" alt="Loading spinner" />
          <p>{motivationalQuote}</p>
        </div>
      ) : (
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          
            <Route path="/multiplication-quiz" element={<MultiplicationQuiz />} />
            <Route path="/MathQuiz" element={<MathQuiz />} />
            <Route path="/adhd-questions" element={<ADHDQuestions />} />
            <Route path="/exercises" element={<Exercises />} />
         
            <Route path="/Course" element={<Course />} />
            <Route path="/AlgebraCourse" element={<AlgebraCourse />} />
          </Routes>
          {timerFinished && <p>Good job!</p>}
        </div>
      )}
    </Router>
  );
}

export default App;
