    import React, { useState, useEffect } from 'react';
    import './mulistyleboring.css';

    const MathQuiz = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [timer, setTimer] = useState(45);
    const [operator, setOperator] = useState('+');

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateQuestion = () => {
        const num1 = randomNumber(1, 10);
        const num2 = randomNumber(1, 10);
        const question = `${num1} ${operator} ${num2}`;
        let answer;

        switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '×':
            answer = num1 * num2;
            break;
        case '÷':
            answer = num1 / num2;
            break;
        default:
            break;
        }

        setQuestion(question);
        setAnswer(answer);
    };

    useEffect(() => {
        generateQuestion();
    }, [operator]);

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (parseFloat(userAnswer) === answer) {
        setMessage('Correct!');
        setScore((prevScore) => prevScore + 1);
        } else {
        setMessage(`Incorrect. The answer was ${answer}.`);
        }

        setUserAnswer('');
        generateQuestion();
    };

    const handleOperatorChange = (operator) => {
        setOperator(operator);
    };


    const handleRestart = () => {
        setScore(0);
        setTimer(45);
        setIsQuizFinished(false);
    };

    if (timer === 0 || isQuizFinished) {
        return (
        <div className="math-quiz">
            <div className="result">
            <h1>{score === 0 ? 'Try again' : 'Quiz finished!'}</h1>
            <p>Your score: {score}</p>
            <button onClick={handleRestart} className="restart">
                Restart
            </button>
            </div>
        </div>
        );
    }
    return (
        <div className="math-quiz">
        <h1>Math Quiz</h1>
        <p>Score: {score}</p>
        <p>Time: {timer}</p>
        <form onSubmit={handleSubmit}>
            <p>{question}</p>
            <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        <p>{message}</p>
        <div>
            <button onClick={() => handleOperatorChange('+')}>Addition</button>
            <button onClick={() => handleOperatorChange('-')}>Subtraction</button>
            <button onClick={() => handleOperatorChange('×')}>Multiplication</button>
        </div>
        </div>
    );
    };

    export default MathQuiz;
