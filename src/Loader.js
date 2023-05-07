import React, { useState, useEffect } from 'react';
import './Exercises.css';
import { exercisesData } from '/Users/ali/educare/src/exercisesData.js';
import Loader from '/Users/ali/educare/src/Loader.js';

const Exercises = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [randomInfo, setRandomInfo] = useState('');

  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Set random information
    const info = exercisesData[Math.floor(Math.random() * exercisesData.length)].info;
    setRandomInfo(info);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="Exercises">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Algebra Quiz</h2>
          <p>{randomInfo}</p>
          <ul>
            {exercisesData.map((exercise, index) => (
              <li key={index}>
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Exercises;
