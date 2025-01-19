// src/app/edit-job/[id]/page.jsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import JobForm from '../../components/JobForm';

const EditJobPage = () => {
    const { id } = useParams(); 

    return <JobForm jobId={id} />;
};

export default EditJobPage;
