import axios from "axios"

export const csvParserApi = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
)

export const saveCSV = (formData) => {
   return  csvParserApi.post('/process-csv' ,formData , {
        headers : {
            "content-type" : "multipart/form-data"
        }
    }) ;
}

 export const getData = () => {
     return csvParserApi.get('/get-data');
 }
