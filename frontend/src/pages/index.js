import React, { useState } from "react";
import FileUploadComponent from "./components/FileUploadComponent";
import ProcessingResultsComponent from "./components/ProcessingResultsComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { getEmployees, getSummary } from "./api/csvapi";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [jobTitleAverages, setJobTitleAverages] = useState({});

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await getEmployees(formData)
        .then((resp) => setEmployees(resp.data))
        .catch(console.error("Error uploading file"));

      const avgSalaryResponse = await getSummary(formData)
        .then((resp) => setJobTitleAverages(resp.data))
        .catch(console.error("Error uploading file"));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="mb-4 display-9 p-2 m-2" >
        <b>CSV Parser</b>
      </div>

      <FileUploadComponent onFileUpload={handleFileUpload} />
      <ProcessingResultsComponent
        employees={employees}
        jobTitleAverages={jobTitleAverages}
      />
    </div>
  );
};

export default App;
