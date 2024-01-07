import {useState} from "react";
import {useAxios} from "@/hooks/useAxios";

const upload = async (axios,fileName) => {
    console.log("fileNam : ", fileName)
    return await axios.get(`/csv/${fileName}`);
};

export const useGetStructuredCSV = () => {
    const [data, setData] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const axiosInstance = useAxios();

    const performService = async (fileName) => {
        try {
            setLoading(true);
            const result = await upload(axiosInstance,fileName);
            setData(result?.data);
        } catch (error) {
            setError(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        performService,
    };
};
