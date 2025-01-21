import JobForm from "@/components/features/jobs/JobForm/JobForm"

export default function EditJob({ params }) {
  return <JobForm jobId={params.id} />
}

