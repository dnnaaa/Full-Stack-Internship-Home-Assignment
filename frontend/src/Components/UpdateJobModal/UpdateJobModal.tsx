import React, { useEffect, useState } from "react";
import { Job } from "../../helpers/declarations";
import { GetJobById, UpdateJob } from "../../Services/JobService";
import { toast } from "react-toastify"; 

interface ModalProps {
  id: number;
  isOpen: boolean;
  onClose: (data?: UpdateJobDto) => void;
}

export interface UpdateJobDto {
  title: string;
  description: string;
  location: string;
  salary: number;
}

const UpdateJobModal: React.FC<ModalProps> = ({ id, isOpen, onClose }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [formValues, setFormValues] = useState<UpdateJobDto>({
    title: "",
    description: "",
    location: "",
    salary: 0,
  });

  useEffect(() => {
    if (id && isOpen) {
      const fetchJob = async () => {
        try {
          const jobData = await GetJobById(id);
          if (jobData) {
            setJob(jobData);
            setFormValues({
              title: jobData.title,
              description: jobData.description,
              location: jobData.location,
              salary: jobData.salary,
            });
          }
        } catch (error) {
          console.error("Error fetching job details:", error);
          toast.error("Error fetching job details.");
        }
      };
      fetchJob();
    }
  }, [id, isOpen]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UpdateJob(id,formValues); 
      toast.success("Job updated successfully!"); 
      onClose(formValues); 
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Error updating job.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => onClose()}
      className="fixed left-0 top-0 z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Update Job</h3>
          <button
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, title: e.target.value }))
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formValues.location}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formValues.salary}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    salary: Number(e.target.value),
                  }))
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => onClose()}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobModal;
