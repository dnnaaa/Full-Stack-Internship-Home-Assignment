import React, { useState } from "react";
import UploadFile from "../Interfaces/page1";
import Processing from "../Interfaces/page2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Employees, Summary } from "./api/api";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [jobTitleAverages, setJobTitleAverages] = useState({});
  
  
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const employeesResponse = await Employees(formData)
        .then((resp) => setEmployees(resp.data))
        .catch(console.error("Error uploading file"));

      const avgSalaryResponse = await Summary(formData)
        .then((resp) => setJobTitleAverages(resp.data))
        .catch(console.error("Error uploading file"));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const appStyle = {
    fontFamily: 'Poppins, sans-serif',
  };

  return (
    <div style={appStyle}>
      <UploadFile onFileUpload={handleFileUpload} />
      <Processing
        employees={employees}
        jobTitleAverages={jobTitleAverages}
      />
    </div>
  );
};

export default App;
