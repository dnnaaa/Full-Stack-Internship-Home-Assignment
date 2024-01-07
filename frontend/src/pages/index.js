// pages/index.js
import React, { useState } from 'react';
import axios from "axios";

const Home = () => {

  const [file, setFile] = useState(null);




  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
 
    formData.append(
      "file", file
    );

    axios.post("http://localhost:8081/api/upload", formData)


  };
 

  return (
    <div class='container-ca'>
      <div class='container'>

        <h1>Upload a CSV File</h1>
        <input type='file' accept={'*.csv'} onChange={handleFileChange}/>
        <button class='btn' onClick={handleUploadClick} >Upload </button>
      </div>
    </div>
  );
};

export default Home;
