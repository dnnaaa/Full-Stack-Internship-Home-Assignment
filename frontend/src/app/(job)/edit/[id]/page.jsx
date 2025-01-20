import EditForm from '@/ui/job/editForm';
import React from 'react'

const page = ({ params }) => {

  const id = params.id;

  return <EditForm id={id} />;

};

export default page;
