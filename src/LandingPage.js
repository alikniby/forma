import React, { useState } from 'react';
import VisualTable from './VisualTable.js';
import '/Users/ali/educare/src/ADHDQuestions.css';

const ADHDQuestions = () => {
  const [fontSize, setFontSize] = useState('normal');
  const [lineSpacing, setLineSpacing] = useState('normal');
  const [fontType, setFontType] = useState('sans-serif');
  const [displayMode, setDisplayMode] = useState('regular');

  const handleUserPreferenceChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'fontSize':
        setFontSize(value);
        break;
      case 'lineSpacing':
        setLineSpacing(value);
        break;
      case 'fontType':
        setFontType(value);
        break;
      case 'displayMode':
        setDisplayMode(value);
        break;
      default:
        break;
    }
  };

  const contentClassName = `content ${fontSize} ${lineSpacing} ${fontType} ${displayMode}`;

  return (
    <div className="adhd-questions">
      <div className="user-preferences">
        <h2>Math is a language, learn the basics here</h2>

        <label htmlFor="fontSize">Font size:</label>
        <select name="fontSize" id="fontSize" onChange={handleUserPreferenceChange}>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>

        <label htmlFor="lineSpacing">Line spacing:</label>
        <select name="lineSpacing" id="lineSpacing" onChange={handleUserPreferenceChange}>
          <option value="normal">Normal</option>
          <option value="wide">Wide</option>
        </select>

        <label htmlFor="fontType">Font type:</label>
        <select name="fontType" id="fontType" onChange={handleUserPreferenceChange}>
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
        </select>

        <label htmlFor="displayMode">Display mode:</label>
        <select name="displayMode" id="displayMode" onChange={handleUserPreferenceChange}>
          <option value="regular">Regular</option>
          <option value="night">Night</option>
          <option value="high-contrast">High contrast</option>
        </select>
      </div>
      <div className={contentClassName}>
        {<VisualTable/>}
        {/* <TextExplanation /> */}
      </div>
    </div>
  );
};

export default ADHDQuestions;
