import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css"

function Upload() {
    const [file, setFile] = useState(null);

    const navigate=useNavigate();

    const navigateToAnotherPage = () => {
      navigate('/employee');
      
    };
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleFileUpload = () => {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('http://localhost:8083/upload-csv-file', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          
        })
        .catch(error => {
          console.error('Error:', error);
        
        });

        navigateToAnotherPage();
        
    };
  return (
    <div>
     

<div class="frame">
	<div class="center">
		<div class="title">
			<h1>Drop file to upload</h1>
		</div>

		<div class="dropzone">
    <form    enctype="multipart/form-data">
        <div class="form-group mt-3">
          <label for="file">Select a CSV file</label>
          <input type="file" name="file" onChange={handleFileChange} class="form-control-file"  id="file" accept=".csv" />
          <button type="submit" onClick={handleFileUpload}  class="btn bt">Import File</button>
        </div>
        
     </form>
		</div>

		

	</div>
</div>
      

    </div>
    
  );
  
  
}
export default Upload