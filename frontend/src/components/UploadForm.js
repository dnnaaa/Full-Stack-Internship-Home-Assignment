import React from "react";

const UploadForm = ({ onFileChange }) => {
  return (
    <div>
      <h1 className="mt-8 ml-6 ">Upload You CSV file:</h1>
      <input
        type="file"
        onChange={onFileChange}
        className="ml-6 mt-6 mr-6 w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"
      />
      <p className="text-xs text-gray-400 mt-2 ml-6">Only CSV are Allowed.</p>
    </div>
  );
};

export default UploadForm;
