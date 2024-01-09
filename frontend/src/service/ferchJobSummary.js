import axios from "axios";
import { BASE_URL, AVERAGESALARY_ENDPOINT } from "../pages/api/ApiKey";
export const fetchJobSummary = async (setJobSummary, setError) => {
  try {
    const response = await axios.get(BASE_URL + AVERAGESALARY_ENDPOINT);
    setJobSummary(response.data);
  } catch (error) {
    console.error("Error fetching job summary data:", error);
    setError("Error fetching job summary data. Please try again.");
  }
};
