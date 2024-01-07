import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:8081/api/v1/employees",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
