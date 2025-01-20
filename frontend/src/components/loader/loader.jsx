import React from 'react';
import "./loader.css";

function loader() {

  return (
        
            <div className="spinner">
              <span>Loading...</span>
              <div className="half-spinner"></div>
            </div>
  );
}

export default loader
