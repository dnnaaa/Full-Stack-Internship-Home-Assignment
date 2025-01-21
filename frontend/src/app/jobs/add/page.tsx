'use client';

import React from 'react';
import JobForm from '../../components/jobForm';

export default function AddJobPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Job</h1>
      <JobForm />
    </div>
  );
}
