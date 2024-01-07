import React from 'react';

const ProcessButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Process
    </button>
  );
};

export default ProcessButton;
