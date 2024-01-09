import React from "react";

const ProcessButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <p className="m-6 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none">
        Upload
      </p>
    </button>
  );
};

export default ProcessButton;
