import React from 'react';

const CancelButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
