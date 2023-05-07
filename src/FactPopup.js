const FactPopup = ({ fact, onClose, visible }) => {
    return (
      <div className={`fact-popup ${visible ? 'visible' : ''}`}>
        <div className="overlay" onClick={onClose}></div>
        <div className="content">
          <p>{fact}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  export default FactPopup;