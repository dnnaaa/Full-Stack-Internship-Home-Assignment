
import {useState} from "react";
import Employee from "./employee";
import JobSummary from "./jobsummary";

/**
 * Home component
 *
 * @returns {JSX.Element} The rendered Home component
 */
const Home = () => {
  // State variables
  const [file, setFile] = useState(null); // Holds the selected file
  const [dataReady, setDataReady] = useState(false); // Indicates if data is ready for display

  /**
   * Callback function for handling file upload.
   * @param {Event} e - The file upload event.
   */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  /**
   * Callback function for processing the file.
   */
  const processFile = () => {
    const formData = new FormData();
    formData.append('file', file);
    fetch('http://localhost:8080/employees/process', { method: 'POST', body: formData })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json();
        })
        .then(json => {
            console.log(json)
          if (json.status !== "SUCCESS") {
            throw new Error(json.message);
          }
          setFile(null);
          setDataReady(true);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  /**
   * Callback function for choosing a file.
   */
  const chooseFile = () => {
    document.getElementById('file').click();
  }
  return (
      <>
        <div className='flex flex-row items-center justify-center my-14'>
          <div>
            <button type="button" onClick={chooseFile}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Upload</button>
            <input id="file" type="file" multiple={false} style={{ display: 'none' }} onChange={handleFileUpload} />
          </div>
          {file!=null &&
              <button className="ml-14 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                      onClick={processFile}>Process</button>
          }
        </div>
        {dataReady &&
            <>
              <Employee />
              <JobSummary />
            </>
        }
      </>
  );
}

export default Home
