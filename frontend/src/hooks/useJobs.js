import { useState, useEffect } from "react"
import { getAllJobs, deleteJob as deleteJobApi } from "@/services/api/jobs.api"
import { useErrorHandler } from "./useErrorHandler"

export function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const { error, handleError, clearError } = useErrorHandler()

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const data = await getAllJobs()
      setJobs(data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteJobApi(id)
      setJobs(jobs.filter((job) => job.id !== id))
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return { jobs, loading, error, handleDelete, refetch: fetchJobs, clearError }
}