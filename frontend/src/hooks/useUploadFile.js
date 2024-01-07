import {useState} from "react";
import {useAxios} from "@/hooks/useAxios";

const upload = async (axios, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return await axios.post("/csv", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
};

export const useUploadFile = () => {
    const [data, setData] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const axiosInstance = useAxios();

    const performUpload = async (file) => {
        try {
            setLoading(true);
            const result = await upload(axiosInstance,file);
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
        performUpload,
    };
};
