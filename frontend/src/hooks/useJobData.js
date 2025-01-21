import { useState, useEffect } from "react"
import { getJobById } from "@/services/api/jobs.api"
import { useErrorHandler } from "./useErrorHandler"

export function useJobData(id) {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const { error, handleError, clearError } = useErrorHandler()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        const data = await getJobById(id)
        setJob(data)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

  return { job, loading, error, clearError }
}