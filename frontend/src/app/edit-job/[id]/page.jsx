"use client"

import { useJobData } from "@/hooks/useJobData"
import JobForm from "@/components/features/jobs/JobForm/JobForm"
import { CircularProgress, Container } from "@mui/material"
import { ErrorDisplay } from "@/components/common/ErrorDisplay/ErrorDisplay"

export default function EditJob({ params }) {
  const { job, loading, error, clearError } = useJobData(params.id)

  if (loading) {
    return (
      <Container maxWidth="md" className="py-8">
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" className="py-8">
        <ErrorDisplay error={error} onClose={clearError} />
      </Container>
    )
  }

  return <JobForm job={job} />
}