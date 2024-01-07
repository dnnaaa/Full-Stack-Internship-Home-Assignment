import { useState } from 'react';
import styles from './interfaces.module.css';
import { useRouter } from 'next/router';

const Interface1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    console.log('Uploading file:', selectedFile.name);
    router.push(`/interface2?fileName=${encodeURIComponent(selectedFile.name)}`);
  };

  return (
    <div className={styles.container}>
      <h1>Upload File</h1>
      <div className={styles.uploadContainer}>
        <input type="file" onChange={handleFileChange} />
        <button className={styles.button} onClick={handleUploadClick}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Interface1;