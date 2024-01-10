import React from "react";

const ProcessButton = ({ onProcess }) => {
  return (
    <div className="flex flex-col items-center pt-6">
      <button
        className="bg-blue-400 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none"
        onClick={onProcess}
      >
        Precess
      </button>
    </div>
  );
};

export default ProcessButton;
