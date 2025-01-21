"use client"

import { Button } from "@/components/common/Button/Button"
import { Container, Typography, Box } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import JobTable from "./components/JobTable"
import Link from "next/link"
import { useJobs } from "@/hooks/useJobs"

export default function JobList() {
  const { jobs, handleDelete } = useJobs()

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="text-3xl font-bold text-gray-900">
          Job Listings
        </Typography>
        <Link href="/add-job" passHref>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add New Job
          </Button>
        </Link>
      </Box>
      <JobTable jobs={jobs} onDelete={handleDelete} />
    </Container>
  )
}

