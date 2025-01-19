import { useEffect, useState } from "react"
import { Job, JobMutation } from "../types"
import { getJob } from "../services/jobs-service";

interface FormInterface {
    jobId?: number;
    handleSubmit: () => void;
}

const Form = ({ jobId, handleSubmit }: FormInterface) => {
    const [formData, setFormData] = useState<JobMutation>({
        title: '',
        description: "",
        location: "",
        salary: 0,
    });

    useEffect(() => {
        if (jobId) {
            const fetchJob = async () => {
                const jobResult = await getJob(Number(jobId));
                console.log(jobResult);
                setFormData({
                    title: jobResult.title,
                    description: jobResult.description,
                    location: jobResult.location,
                    salary: jobResult.salary,
                });
            }
            fetchJob();
        }
    }, [jobId])
    return (
        <div>
            <h2>{formData ? "Edit Job" : "Add New Job"}</h2>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}
export default Form