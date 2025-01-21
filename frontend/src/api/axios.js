import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

export default axios;
