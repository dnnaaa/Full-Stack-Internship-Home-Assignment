'use client';
import { useState } from 'react';
import JobForm from '../../components/jobForm';
import { useRouter } from 'next/navigation';

const CreateJobPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleFormSubmit = () => {
    setIsSubmitted(true);
    router.push('/jobs');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create a Job</h1>
      <JobForm mode="create" onSubmit={handleFormSubmit} />
      {isSubmitted && <p className="mt-4 text-green-600">Job created successfully!</p>}
    </div>
  );
};

export default CreateJobPage;
