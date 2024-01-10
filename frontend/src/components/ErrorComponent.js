import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div>
      <p className="text-red-700">Error: {message}</p>
    </div>
  );
};

export default ErrorComponent;