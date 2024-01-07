import React from 'react';

const ProcessButton = ({ onClick }) => {
  return (
    <div className="process-button">
      <button onClick={onClick} className="process-btn">
        Process
      </button>
    </div>
  );
};

export default ProcessButton;