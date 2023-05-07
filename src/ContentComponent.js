import React from 'react';

const ContentComponent = ({ title, description, image }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={image} alt={title} style={{ width: '100%', maxWidth: '300px' }} />
    </div>
  );
};

export default ContentComponent;
