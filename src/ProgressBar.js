import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#ccc' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '10px',
          backgroundColor: 'blue',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;

