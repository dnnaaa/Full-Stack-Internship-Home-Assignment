import React from 'react';
import "./loader.css"; // Import the CSS file for loader styling

/**
 * Loader Component
 * Displays a spinning animation with a "Loading..." message.
 *
 * @returns {JSX.Element} A loader element to indicate ongoing processes.
 */
function Loader() {
  return (
    <div className="spinner">
      {/* Loading message */}
      <span>Loading...</span>
      {/* Spinning animation */}
      <div className="half-spinner"></div>
    </div>
  );
}

export default Loader;
