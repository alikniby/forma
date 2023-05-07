import React from 'react';
import './style.css';

const VideoModal = ({ isOpen, closeModal }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
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
    </div>
  );
};

export default VideoModal;
