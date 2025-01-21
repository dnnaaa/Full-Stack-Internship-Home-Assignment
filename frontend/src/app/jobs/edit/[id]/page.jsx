'use client';
import { useState, useEffect } from 'react';
import axios from '../../../../../utils/axios';
import { useRouter } from 'next/navigation';
import JobForm from '../../../components/jobForm';

const EditJobPage = ({params}) => {
  const router = useRouter();
  console.log(params);
  const id = params.id;
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/jobs/${id}`)
        .then((response) => {
          setJobData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching job data:', error);
        });
    }
  }, [id]);

  const handleFormSubmit = () => {
    router.push('/jobs');
  };

  if (!jobData) return <div>Loading...</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Job</h1>
      <JobForm mode="edit" jobData={jobData} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default EditJobPage;
