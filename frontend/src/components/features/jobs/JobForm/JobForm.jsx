"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Container, Typography, Paper, Box } from "@mui/material"
import { Save as SaveIcon } from "@mui/icons-material"
import { Input } from "@/components/common/Input/Input"
import { Button } from "@/components/common/Button/Button"
import { useForm } from "@/hooks/useForm"
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (job) {
        await updateJob(job.id, formData)
        toast.success("Job updated successfully")
      } else {
        await createJob(formData)
        toast.success("Job created successfully")
      }
      router.push("/")
    } catch (error) {
      toast.error("Failed to submit job. Please try again.")
    }
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-6 rounded-xl">
        <Typography variant="h4" component="h1" className="mb-6 text-3xl font-bold text-gray-900">
          {job ? "Edit Job" : "Add New Job"}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input fullWidth label="Job Title" name="title" value={formData.title} onChange={handleChange} required />
          <Input
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
          <Input
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Input
            fullWidth
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            type="number"
          />
          <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
            {job ? "Update Job" : "Add Job"}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

