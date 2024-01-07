import axios from "axios";

export const useAxios = () => {
    return axios.create({
        baseURL:
        process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8081/api",
    });
};
