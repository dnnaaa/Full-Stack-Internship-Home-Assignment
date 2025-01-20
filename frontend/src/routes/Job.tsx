import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { addJob, getJob, updateJob } from "../services/jobs-service";
import { JobMutation } from "../types";
import Form from "../components/Form";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Job = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState<string>(id ? "Update job" : "Add new job");
  const [formData, setFormData] = useState<JobMutation>({
    title: "",
    description: "",
    location: "",
    salary: 0,
  });

  // Fetch job data in case of update
  useEffect(() => {
    const fetchJobs = async () => {
      if (id) {
        const jobsResult = await getJob(Number(id));
        setFormData({
          title: jobsResult.title || "",
          description: jobsResult.description || "",
          location: jobsResult.location || "",
          salary: jobsResult.salary || 0,
        });
        setPageTitle(`Update job : ${jobsResult.title}`);
        console.log(jobsResult);
      }
    }
    fetchJobs();
  }, [id]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Convert salary to number
    const newValue = name === 'salary' ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      // In case of updating a job
      const update = async () => {
        await updateJob(formData, Number(id));
        navigate("/");
      }
      update();
      return;
    }

    // In case of adding a job
    const add = async () => {
      await addJob(formData);
      navigate("/");
    }
    add();
  }


  return (
    <>
      <NavLink to="/" className="text-sm text-blue-500 hover:text-blue-700 underline flex items-center gap-2">
        <ArrowBackIosIcon className="text-sm" />
        Back to jobs list
      </NavLink>
      <h2 className="text-3xl font-semibold mt-8">{pageTitle}</h2>
      <Form
        formData={formData}
        isEdit={id ? true : false}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}
export default Job