"use client"
import {useEffect, useState} from "react"
import JobsTable from "@/components/JobsTable";
import EmployeesTable from "@/components/EmployeesTable";
import axios, {AxiosHeaders} from "axios";

// Main component for the interface
export default function MainUI(){
    const [employees,setEmployees]=useState([])
    const [error,setError]=useState({alert:false,message:""})
    return (
        <div className="px-3">
            {error.alert?<div className={"text-center text-red-700 mb-2"}>{error.message}</div>:""}
            <Form setData={setEmployees} setError={setError}/>
            <EmployeesTable employees={employees}/>
            <JobsTable employees={employees}/>
        </div>
    )
}


// Form component responsible for handling the upload and the sending of the file to the server
function Form({setData,setError}){
    const [isUploaded,setIsUploaded]=useState(false)

    //function that sends the file to the server for processing
    function processFile() {
        const  file=document.querySelector("#file").files[0]
        const formData=new FormData()
        formData.append("employees",file)
        const headers=new AxiosHeaders()
        headers.set("Content-Type","multipart/form-data")
        axios.post("http://localhost:8080/upload",formData,{headers:headers})
            .then(res=>{
                setError({alert:false})
                setData(res.data)
            })
            .catch(errors=>{
                // display the error to the user
                setError({alert:true,message:errors.response.data})
            })

    }

    // function to be called when the user select a new file
    function fileChanged(){
        setData([])
        setError({alert:false,message:""})
        setIsUploaded(true)
    }

    return (
        <form  encType={"multipart/form-data"} >
            <input style={{display:"none"}} id={"file"} onChange={fileChanged} type={"file"} accept={".csv"} />
            <div className="flex justify-center" >
                <button style={{marginRight:"50px"}} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={()=>{document.querySelector("#file").click()}} type={"button"}>Upload</button>
                {
                    isUploaded?<button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={processFile} type={"button"}>Process</button>:""
                }
            </div>
        </form>
    )
}
