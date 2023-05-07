import React, { useState, useEffect } from 'react';
import '/Users/ali/educare/src/VisualTable.css';
import Chatbot from '/Users/ali/educare/src/Chatbot.js';

const VisualTable = () => {
  const tableSize = 10;
  const [result, setResult] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [emojiRow, setEmojiRow] = useState(Math.floor(Math.random() * tableSize) + 1);
  const [emojiCol, setEmojiCol] = useState(Math.floor(Math.random() * tableSize) + 1);
  const [lastInteraction, setLastInteraction] = useState(0);
  const [hoverCount, setHoverCount] = useState(0); // Add this line

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(newMediaRecorder);

          newMediaRecorder.ondataavailable = async (e) => {
            const data = await e.data.arrayBuffer();
            const base64 = arrayBufferToBase64(data);
            const newRecording = {
              url: `data:audio/webm;base64,${base64}`,
              id: new Date().getTime(),
            };
            setRecordings((prevRecordings) => [...prevRecordings, newRecording]);
          };
        })
        .catch((error) => {
          console.error('Error accessing the microphone:', error);
        });
    }
  }, []);
  const handleMouseEnter = (e) => {
    const now = new Date().getTime();
    if (now - lastInteraction < 200) {
      setResult('Slow down, but keep looking! 🐢');
      setLastInteraction(now);
      return;
    }
  
    setLastInteraction(now);
  
    const row = parseInt(e.target.parentElement.dataset.row, 10);
    const col = parseInt(e.target.dataset.col, 10);
    const product = row * col;
    setResult(`${row} * ${col} = ${product}`);
  
    // Check if the mouse is hovering over the number 3
    if (row === 3 && col === 3) {
      alert('Congratulations! You found the hidden number!');
    } else if (row === emojiRow && col === emojiCol) {
      setHoverCount((prevHoverCount) => prevHoverCount + 1);
      if (hoverCount >= 1) {
        alert('Congratulations! You found the hidden emoji 🎉');
        setEmojiRow(Math.floor(Math.random() * tableSize) + 1);
        setEmojiCol(Math.floor(Math.random() * tableSize) + 1);
        setHoverCount(0);
      }
    }
  };
  
  
  
  
  const handleMouseLeave = () => {
    setResult('');
  };

  const handleStartRecording = () => {
    if (mediaRecorder) {
      setIsRecording(true);
      mediaRecorder.start();
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      setIsRecording(false);
      mediaRecorder.stop();
    }
  };

  const playRecording = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  const deleteRecording = (id) => {
    setRecordings((prevRecordings) => prevRecordings.filter((recording) => recording.id !== id));
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className="multiplication-table">
      <div className="result">{result}</div>
      <table>
        <tbody>
          {Array.from({ length: tableSize }, (_, i) => i + 1).map((row) => (
            <tr key={row} data-row={row}>
              {Array.from({ length: tableSize }, (_, i) => i + 1).map((col) => {
                return (
                  <td
                    key={col}
                    data-col={col}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {col}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bottom-container">
        <div className="recording-container">
          <p>Try to record yourself whilst training on the table:</p>
          <div>
            <button onClick={handleStartRecording} type="button" disabled={isRecording}>
              Start
            </button>
            <button onClick={handleStopRecording} type="button" disabled={!isRecording}>
              Stop
            </button>
          </div>
          <div>
            <h3>Recordings:</h3>
            <ul>
              {recordings.map((recording) => (
                <li key={recording.id}>
                  {`Recording - ${new Date(recording.id).toLocaleString()}`}
                  <button onClick={() => playRecording(recording.url)}>Play</button>
                  <button onClick={() => deleteRecording(recording.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Chatbot />
      </div>
    </div>
  );
  
  
};

export default VisualTable;

     
