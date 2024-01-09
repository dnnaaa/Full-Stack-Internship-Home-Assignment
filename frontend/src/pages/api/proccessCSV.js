import axios from "axios";
import appendError from "../Functionalitty/appendError";

export function proccessUpload(File,setEmployees,setJobSummary) {

    const formData = new FormData();
    formData.append('file', File);
    
    return axios.post('http://localhost:8080/employees/', formData)
    .then((res) => {
        console.log("res")
        console.log(res)
        setEmployees(res.data.EmployeersList)
        setJobSummary(res.data.JobTitleAVG)
    })
    .catch((err) => {
        console.log("err")
        console.log(err)
        if(err.response.status == 400)
            return appendError(err.response.data.message)
        appendError("SomeThing When Wrong. Please retry Later")
    })


}