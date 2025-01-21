import { useState, useEffect } from "react"
import { getAllJobs, deleteJob as deleteJobApi } from "@/services/api/jobs.api"

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const data = await getAllJobs()
      setJobs(data)
    } catch (err) {
      setError("Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }

  const deleteJob = async (id) => {
    try {
      await deleteJobApi(id)
      setJobs(jobs.filter((job) => job.id !== id))
    } catch (err) {
      setError("Failed to delete job")
    }
  }

  return { jobs, loading, error, deleteJob, refetch: fetchJobs }
}

