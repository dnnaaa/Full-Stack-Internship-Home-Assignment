import { Inter } from 'next/font/google'
import {useEffect, useState} from 'react'
import ProcessButton from "@/components/ProcessButton";
import {saveCSV , getData} from "@/functions/MainService";
import Table from "@/components/Table";
import UploadForm from "@/components/UploadForm";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [csvFile,setCsvFile] = useState(null)
  const [isCsvUploaded,setIsCsvUploaded] = useState(false)
  const [message,setMessage] = useState(null);
  const [employees,setEmployees] = useState([])
  const [summary,setSummary] = useState([])

  useEffect( () => {
    const fetch = async () => {
      try {
        const response = await getData();
        if(Object.keys(response.data).length !== 0) {
          converBackEndDataToArray(response.data.employees, response.data.summary);
        }
      }catch(e) {
        setMessage("Failed to connect to the server");
        console.log(e);
      }
       }
    fetch();
  },[message])

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCsvUploaded(true);
    setEmployees([]);
    setSummary([]);
  }

  const handleProcess = async () => {

    if(employees.length > 0 && summary.length > 0 ) {
      setMessage("Data is already processed");
    }else {
      const formData = new FormData();
      formData.append("csv_file", csvFile);
      try {
        const response = await saveCSV(formData);
       converBackEndDataToArray(response.data.employees, response.data.summary);
       setMessage(response.data.message);
        setIsCsvUploaded(false);
        setCsvFile(null);
      } catch (e) {
        setMessage("Could not process your CSV file");
        console.log(e);
      }
    }

  }

  const converBackEndDataToArray = (employees,summary) => {
    setEmployees(employees.map(e =>({"id": e.id , "employee_name" : e.employee_name , "job_title" : e.job_title , "salary": e.salary})));
    setSummary(Object.entries(summary).map(([jobTitle, salary]) => ({
      job_title: jobTitle,
      salary: salary.toFixed(3),
    })));
  }

  return (
    <main
      className={` container ${inter.className}`}
    >
      <div className="  font-bold px-6 py-4 shadow-lg rounded-md border-2 border-indigo-300 m-5 text-3xl text "> DNA Engineering CSV Parser </div>
      <div className='container'>
        {message && <div className='flex justify-center content-center'>
          <span className='text-red-500 text-xl font-semibold'> {message} </span>
        </div>
        }

        <UploadForm handleSubmit={handleSubmit} handleProcess={handleProcess}
        csvFile={csvFile} setCsvFile={setCsvFile} isCsvUploaded={isCsvUploaded}/>

        <div className=' ml-5 flex flex-row mt-8  '>
          { employees.length >0 &&
                <div className='basis-2/3'>
                  <h2 className=' text-3xl text font-bold ml-4 '> Employees :</h2>
                 <Table data={employees} columns={['id','employee_name', 'job_title', 'salary']}/>
                </div> }
          { Object.keys(summary).length > 0 &&
        <div className='basis-1/3 '>
          <h2 className=' text-3xl text font-bold ml-4 '> Job Title Summary :</h2>
            <Table data={summary} columns={[ 'job_title', 'salary']}/>
        </div>}
        </div>

      </div>
    </main>
  )
}
