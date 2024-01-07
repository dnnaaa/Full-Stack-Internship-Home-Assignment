import React from 'react';
import styles from './interfaces.module.css'; 
import { useRouter } from 'next/router';

const Interface2 = () => {
  const router = useRouter();
  const { fileName } = router.query;
  const handleProcessClick = () => {
    router.push(`/interface3?fileName=${encodeURIComponent(fileName)}`);
  };

  return (
    <div className={styles.container}>
    <h1>Processing ....</h1><br></br><br></br>
    <button className={styles.button} onClick={handleProcessClick}>
      Process
    </button>
  </div>
  );
};

export default Interface2;