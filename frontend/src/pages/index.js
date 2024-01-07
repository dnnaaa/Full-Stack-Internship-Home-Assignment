import { useState } from 'react';
import FileUploadComponent from "@/components/FileUploadComponent";
import EmployeeComponent from "@/components/EmployeeComponent";
import SalarySummaryComponent from "@/components/SalarySummaryComponent";

export default function Home() {

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [salarySummary, setSalarySummary] = useState({});


  const handleFileUpload= (data) => {
    setEmployees(data.employees);
    setSalarySummary(data.salarySummary);
    setIsFileUploaded(true);
  }
  return (
      <div className="flex flex-col justify-center pt-20">
        <FileUploadComponent onFileUpload={handleFileUpload} />
        {isFileUploaded && (
            <>
                {employees.length > 0 && <EmployeeComponent employees={employees} />}
                {Object.keys(salarySummary).length > 0 && <SalarySummaryComponent salarySummary={salarySummary} />}
            </>
            )}
      </div>
  )
}
