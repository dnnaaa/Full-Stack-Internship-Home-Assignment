import axios from "axios";

export const csvAPI = axios.create({
  baseURL: "http://localhost:8080/api/csv",
});

export const getEmployees = (csv) => {
  return csvAPI.post("/parse", csv);
};

export const getSummary = (csv) => {
  return csvAPI.post("/summary", csv);
};
