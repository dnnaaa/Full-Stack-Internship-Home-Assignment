
"use client";

import { useRouter } from "next/navigation"
import { Container, Typography, Paper } from "@mui/material"
import { Save as SaveIcon } from "@mui/icons-material"
import { Input } from "@/components/common/Input/Input"
import { Button } from "@/components/common/Button/Button"
import { useForm } from "@/hooks/useForm"
import { useErrorHandler } from "@/hooks/useErrorHandler"
import { ErrorDisplay } from "@/components/common/ErrorDisplay/ErrorDisplay"
import { validateJobForm } from "@/utils/validators"
import { createJob, updateJob } from "@/services/api/jobs.api"
import toast from "react-hot-toast"

export default function JobForm({ job }) {
  const router = useRouter()
  const { formData, handleChange, resetForm } = useForm({
    title: job?.title || "",
    description: job?.description || "",
    location: job?.location || "",
    salary: job?.salary || "",
  })

  const { error, handleError, clearError } = useErrorHandler()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateJobForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      handleError({
        code: "VALIDATION_ERROR",
        message: "Please correct the following errors:",
        timestamp: new Date().toISOString(),
        errors: Object.entries(validationErrors).map(([field, message]) => ({
          field,
          message
        }))
      })
      return
    }

    try {
      if (job) {
        await updateJob(job.id, formData)
        toast.success("Job updated successfully")
      } else {
        await createJob(formData)
        toast.success("Job created successfully")
      }
      router.push("/")
    } catch (err) {
      handleError(err)
      toast.error("Failed to submit job. Please try again.")
    }
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-6 rounded-xl">
        <Typography variant="h4" component="h1" className="mb-6 text-3xl font-bold text-gray-900">
          {job ? "Edit Job" : "Add New Job"}
        </Typography>
        
        {error && <ErrorDisplay error={error} onClose={clearError} />}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            fullWidth 
            label="Job Title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            error={error?.errors?.some(err => err.field === 'title')}
            helperText={error?.errors?.find(err => err.field === 'title')?.message}
          />
          
          <Input
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            error={error?.errors?.some(err => err.field === 'description')}
            helperText={error?.errors?.find(err => err.field === 'description')?.message}
          />
          
          <Input
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            error={error?.errors?.some(err => err.field === 'location')}
            helperText={error?.errors?.find(err => err.field === 'location')?.message}
          />
          
          <Input
            fullWidth
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            type="number"
            error={error?.errors?.some(err => err.field === 'salary')}
            helperText={error?.errors?.find(err => err.field === 'salary')?.message}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
          >
            {job ? "Update Job" : "Add Job"}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}