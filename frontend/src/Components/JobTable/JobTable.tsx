import React, { useState } from "react";
import { Job } from "../../helpers/declarations";
import UpdateJobModal, { UpdateJobDto } from "../UpdateJobModal/UpdateJobModal";
import { DeleteJob, UpdateJob } from "../../Services/JobService";
import { toast } from "react-toastify";

interface Props {
  Jobs: Job[];
  deleteJob: (id: number) => void;
  updateJob: (job: Job) => void;
}

const JobTable = (props: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [jobToUpdate, setJobToUpdate] = useState<number>(0);

  const OpenModal = (id: number) => {
    setModalOpen(true);
    setJobToUpdate(id); 
  };

  const CloseModal = async (updateJobDto?: UpdateJobDto) => {
    setModalOpen(false);
    if (updateJobDto) {
      console.log(updateJobDto);
      try {
        const response = await UpdateJob(jobToUpdate, updateJobDto); 
        if (response) {
          props.updateJob(response);
        }
      } catch (error) {
        console.error("Error updating job:", error);
      }
    }
  };
  const Delete = async (id: number) => {
    const loadingToast = toast.loading("Deleting job..."); // Show loading toast
  
    try {
      const response = await DeleteJob(id);
      if (response) {
        toast.update(loadingToast, {
          render: "Job deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        props.deleteJob(id); 
      }
    } catch (error) {
      toast.update(loadingToast, {
        render: "Failed to delete job.",
        type: "error", 
        isLoading: false,
        autoClose: 5000, 
      });
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.Jobs.map((Job) => (
              <tr
                key={Job.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {Job.id}
                </th>
                <td className="px-6 py-4">{Job.title}</td>
                <td className="px-6 py-4">{Job.location}</td>
                <td className="px-6 py-4">{Job.salary}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => OpenModal(Job.id)} 
                    className="bg-orange-500 hover:bg-yellow-700 text-white px-3 py-2 font-medium rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => Delete(Job.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 font-medium rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UpdateJobModal
        isOpen={isModalOpen}
        id={jobToUpdate}  
        onClose={CloseModal}
      />
    </div>
  );
};

export default JobTable;
