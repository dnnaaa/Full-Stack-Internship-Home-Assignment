import axios from "axios";

export const csvAPI = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const Employees = (csv) => {
  return csvAPI.post("/parse", csv);
};

export const Summary = (csv) => {
  return csvAPI.post("/average-salary", csv);
};