import React, { useState, useEffect } from 'react';
import './AlgebraCourse.css';
import { contentData } from '/Users/ali/educare/src/content.js';
import ProgressBar from '/Users/ali/educare/src/ProgressBar.js';
import ContentComponent from '/Users/ali/educare/src/ContentComponent.js';
import FactPopup from '/Users/ali/educare/src/FactPopup.js';
import Chatbot from '/Users/ali/educare/src/Chatbot.js';

const AlgebraCourse = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [factVisible, setFactVisible] = useState(true);
  const [fact, setFact] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [dimPage, setDimPage] = useState(false);
  const [responseVisible, setResponseVisible] = useState(false);

  const progress = (currentStep / contentData.length) * 100;

  const nextStep = () => {
    if (currentStep < contentData.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnswer('');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setUserAnswer('');
    }
  };

  const checkAnswer = () => {
    const isCorrect = contentData[currentStep].exercise.answer === userAnswer.trim();
    if (isCorrect) {
      alert('Correct! Well done!');
    } else {
        alert('Try again, you can do it!');
      const confirmed = window.confirm("Your answer is not correct. Are you sure you want to go to next question? Let's ask the chatbot if you are not able to get the question correct.");
      if (confirmed) {
        nextStep();
      }
    }
  };
  

  const algebraFacts = [
    'Algebra is a branch of mathematics that deals with symbols and the rules for manipulating those symbols.',
    'The word algebra comes from the Arabic word al-jabr, which means "reunion of broken parts."',
    'The earliest known text on algebra was written by the Persian mathematician Al-Khwarizmi in the 9th century.',
    'Algebra is used in many fields, including science, engineering, economics, and cryptography.',
    'Algebra is often taught in high schools and colleges as a part of the mathematics curriculum.',
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * algebraFacts.length);
    setFact(algebraFacts[randomIndex]);
  }, [algebraFacts]);

  const showFact = () => {
    const randomIndex = Math.floor(Math.random() * algebraFacts.length);
    setFact(algebraFacts[randomIndex]);
    setFactVisible(false);
    setDimPage(true);
  };

  return (
    <div className="AlgebraCourse">
      {dimPage && (
        <div
          className="overlay"
          onClick={() => {
            setFactVisible(true);
            setDimPage(false);
          }}
        ></div>
      )}
      <h2>Algebra Course</h2>
      <ProgressBar progress={progress} />
      <ContentComponent
        title={contentData[currentStep].title}
        description={contentData[currentStep].description}
        image={contentData[currentStep].image}
      />
      <div>
        <h3>Exercise</h3>
        <p>{contentData[currentStep].exercise.question}</p>
         <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
        <button onClick={checkAnswer}>Check</button>
        <button onClick={prevStep}>Previous</button>
          <button onClick={nextStep}>Next</button>
      </div>

      {factVisible && (
        <FactPopup fact={fact} onClose={() => setFactVisible(false)} visible={factVisible} />
      )}
      <Chatbot />
    </div>
  );
};

export default AlgebraCourse;

