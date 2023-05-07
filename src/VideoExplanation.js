import React, { useState, useEffect } from 'react';

const VideoExplanation = ({ result }) => {
  const [dimmed, setDimmed] = useState(false);

  useEffect(() => {
    if (result >= 10) {
      setDimmed(true);
    } else {
      setDimmed(false);
    }
  }, [result]);

  return (
    <div className={dimmed ? 'dimmed' : ''}>
      <h3>Video Explanation</h3>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/hJiiLDPsuzo"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoExplanation;
