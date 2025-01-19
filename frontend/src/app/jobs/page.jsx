"use client";
import { useEffect, useState } from "react";
import DenseTable from "../Components/JobTable";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";



export default function JobListPage() {
  let router = new useRouter();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job List</h1>
      <button onClick={() => router.push("/jobs/add")} style={{ marginBottom: "20px" }}>
        Add Job
      </button>
          <DenseTable></DenseTable>
          <ToastContainer></ToastContainer>
    </div>
  );
}
