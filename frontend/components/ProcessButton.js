// ProcessButton.js

import React from 'react';
import styles from './styles/ProcessButton.module.css';

const ProcessButton = ({ onClick, disabled }) => {
  return (
    <button className={styles['process-button']} onClick={onClick} disabled={disabled}>
      Process
    </button>
  );
};

export default ProcessButton;
