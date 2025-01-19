import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJob } from "../services/jobs-service";
import { JobMutation, Job as JobType } from "../types";
import Form from "../components/Form";

const Job = () => {
  const { id } = useParams();


  // const handleAdd = async (job: JobMutation) : Promise<Job> => {
  //   const jobResult = await addJob(job);
  //   return jobResult;
  // }

  const handleAdd = () => {
    console.log("adding");
  }

  const handleEdit = () => {
    console.log("editing");
  }

  return (
    // form, 
    <>
      <div>Job</div>
      {id ?
        <Form jobId={Number(id)} handleSubmit={handleEdit} />
        : <Form handleSubmit={handleAdd} />
      }
    </>
  )
}
export default Job