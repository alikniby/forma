import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const OPENAI_API_KEY = '';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      text: 'Hello there! I am Focus Flamingo, your tutor. I am here to help you learn and grow!',
      type: 'gpt',
    },
  ]);
  const [chatVisible, setChatVisible] = useState(false);

  const getChatGPTResponse = async (query) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `User: ${query}\nTutor:`,
          max_tokens: 150,
          n: 1,
          stop: '\n',
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        },
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      return 'I am only available for member at the moment.';
    }
  };

  const generateTutorResponse = async (query) => {
    if (query.toLowerCase().includes("value of x") || query.match(/(\d+[a-z]|[a-z]\d+|\d+=)/i)) {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `User: ${query}\nTutor (hint):`,
          max_tokens: 150,
          n: 1,
          stop: '\n',
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        },
      );
      return response.data.choices[0].text.trim();
    } else if (query.match(/\d+\s*\*\s*\d+/)) {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `User: ${query}\nTutor (hint):`,
          max_tokens: 150,
          n: 1,
          stop: '\n',
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        },
      );
      return response.data.choices[0].text.trim();
    } else {
      return getChatGPTResponse(query);
    }
  };
  const getFeedbackOnAnswer = async (query) => {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: `User: ${query}\nTutor (feedback):`,
        max_tokens: 150,
        n: 1,
        stop: '\n',
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );
    return response.data.choices[0].text.trim();
  };
  
  const handleUserMessageSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage) return;
    setChatHistory([...chatHistory, { text: userMessage, type: 'user' }]);
  
    if (userMessage.toLowerCase().includes("why should i learn")) {
      setChatHistory([...chatHistory, { text: "Math is a language, and the alphabet for this language is the product. It helps you express complex ideas and solve real-world problems.", type: 'gpt' }]);
    } else {
    const arithmeticExpression = userMessage.match(/^\s*\d+\s*[+\-*/]\s*\d+\s*=\s*\d+\s*$/);
      if (arithmeticExpression) {
        const [left, operator, right, , answer] = userMessage.split(/\s+/);
        const leftNum = parseInt(left, 10);
        const rightNum = parseInt(right, 10);
        const userAnswer = parseInt(answer, 10);
  
        let correctAnswer;
        switch (operator) {
          case '+':
            correctAnswer = leftNum + rightNum;
            break;
          case '-':
            correctAnswer = leftNum - rightNum;
            break;
          case '*':
            correctAnswer = leftNum * rightNum;
            break;
          case '/':
            correctAnswer = leftNum / rightNum;
            break;
          default:
            break;
        }
  
        if (correctAnswer === userAnswer) {
          setChatHistory([...chatHistory, { text: 'Correct! Good job!', type: 'gpt' }]);
        } else {
          setChatHistory([...chatHistory, { text: `No, that's incorrect. The correct answer is ${correctAnswer}.`, type: 'gpt' }]);
        }
      } else {
        const lastMessage = chatHistory[chatHistory.length - 1];
        if (lastMessage.type === 'gpt' && lastMessage.text.toLowerCase().includes('hint')) {
          const feedback = await getFeedbackOnAnswer(userMessage);
          setChatHistory([...chatHistory, { text: feedback, type: 'gpt' }]);
        } else {
          const gptResponse = await generateTutorResponse(userMessage);
          if (gptResponse === '') {
            const fallbackResponses = [
              "You know I think I have the answer but let's think together..",
              "Hmm good question, what do you think the answer is?",
              "Good point! I was not listening but sure if you say so.."
            ];
            const randomResponseIndex = Math.floor(Math.random() * fallbackResponses.length);
            setChatHistory([...chatHistory, { text: fallbackResponses[randomResponseIndex], type: 'gpt' }]);
          } else {
            setChatHistory([...chatHistory, { text: gptResponse, type: 'gpt' }]);
          }
        }
      }
    }
    setUserMessage('');
  };
  
  
  
    const toggleChatVisibility = () => {
      setChatVisible(!chatVisible);
    };
  
    return (
      <div className="chatbot">
        <button onClick={toggleChatVisibility} className="chat-toggle">
          {chatVisible ? 'Hide Chat' : 'Show Chat'}
        </button>
        {chatVisible && (
          <>
            <h3>Focus Flamingo:</h3>
            <ul>
              {chatHistory.map((message, index) => (
                <li key={index} className={message.type}>
                  {message.text}
                </li>
              ))}
            </ul>
            <form onSubmit={handleUserMessageSubmit}>
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask Focus Flamingo anything!"
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </div>
    );
  };

  export default Chatbot;
  
