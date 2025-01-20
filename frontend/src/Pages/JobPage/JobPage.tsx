import React, { useEffect, useState } from "react";
import { Job } from "../../helpers/declarations";
import AddJobModal, {
  AddJobDto,
} from "../../Components/AddJobModal/AddJobModal";
import TableSkeleton from "../../Components/TableSkeleton/TableSkeleton";
import { AllJobs, CreateJob } from "../../Services/JobService";
import JobTable from "../../Components/JobTable/JobTable";

type Props = {};

const JobPage = (props: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [Jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const GetAllJobs = async () => {
      setLoading(true);
      const results = await AllJobs();
      setJobs(results);
      setLoading(false);
    };
    GetAllJobs();
  }, []);
  const CloseModal = async (addJobDto?: AddJobDto) => {
    setModalOpen(false);
    if (addJobDto) {
      console.log(addJobDto);
      try {
        const reponse = await CreateJob(addJobDto);
        if (reponse) {
          setJobs([...Jobs, reponse]);
        } else {
        }
      } catch (error) {}
    } else {
    }
  };
  return (
    <div className={`w-full m-0 p-0`}>
      <div className="pt-36 px-2">
        <div className="flex justify-end py-4 container mx-auto">
          <button
            onClick={(e) => {
              setModalOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 font-medium rounded"
          >
            Ajouter Job
          </button>
        </div>
        {isLoading ? (
          <TableSkeleton isLoading={isLoading}></TableSkeleton>
        ) : (
          <JobTable
            Jobs={Jobs}
            deleteJob={function (id: number): void {
              setJobs((prev) => prev.filter((_, i) => i !== id));
            }}
            updateJob={function (job: Job): void {
              setJobs((prev) =>
                prev.map((item, i) => (i === job.id ? job : item))
              );
            }}
          ></JobTable>
        )}
      </div>
      <AddJobModal isOpen={isModalOpen} onClose={CloseModal}></AddJobModal>
    </div>
  );
};

export default JobPage;
