'use client';
import JobForm from '@components/jobs/JobForm';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const jobId = params.id;

  return <JobForm jobId={jobId} />;
}
