'use client';

import JobForm from '@/components/JobForm';

export default function EditJobPage({ params }) {
  return <JobForm jobId={params.id} />;
}
