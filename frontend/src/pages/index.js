import { useState } from 'react';
import Layout from '../components/Layout';
import FileUploadForm from '../components/FileUploadForm';  
import EmployeeTable from '../components/EmployeeTable';
import SalaryStatsTable from '../components/SalaryStatsTable';
import { processCsv } from "../utils/api";
export default function Home() {

  const [employees, setEmployees] = useState([]); 
  const [salaryStats, setSalaryStats] = useState([]);
  const [errMsg, setErrMsg] = useState(null);


  const onFileUpload = async (file)=> {
      setErrMsg(null);

    // call API to process CSV  
    const res = await processCsv(file);
    if(res.error){
      setErrMsg(res.error);
    }else{
      const { employees, salaryStats } = res;
      setEmployees(employees);
      setSalaryStats(salaryStats);
      setErrMsg(null);
    }

  }

  
  const onReset = async () => {
    setEmployees([])
    setSalaryStats([])
  };

  return (
    <Layout>
      <div className="container">
        {errMsg && (
          <div class="error-box">{errMsg}</div>
        )}
        {employees.length > 0 || salaryStats.length > 0 ? (
          <div className="uploader">
            <button type="submit" className="btn" onClick={onReset}>
              <i class="fa fa-refresh" aria-hidden="true"></i> Reset
            </button>
          </div>
        ) : (
          <FileUploadForm onFileUpload={onFileUpload} />
        )}

        {employees.length > 0 && <EmployeeTable employees={employees} />}

        {salaryStats.length > 0 && <SalaryStatsTable stats={salaryStats} />}
      </div>
    </Layout>
  );
}