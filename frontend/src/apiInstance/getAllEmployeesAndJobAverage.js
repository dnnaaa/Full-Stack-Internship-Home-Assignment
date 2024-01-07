import { apiInstance } from "./apiInstance"


export const getAllEmployeesAndJobAverage = async (data) =>{
    console.log("upload", data)
    return await apiInstance.post('/upload',data)
    .then((response) => response.data)
    .catch((err) =>console.log(err))
 }

