import Link from 'next/link';
import DeleteModal from './deleteModal';
import urls from '@/services/urls';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

export function AddJob() {
  return (
    <Link
      href='/add'
      className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-md font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
        <span className='hidden md:inline'>New Job</span><AddIcon />
    </Link>
  );
}

export function UpdateJob({ id }) {
  return (
    <Link
      href={`/edit/${id}`}
      className='rounded-md border p-2 hover:bg-gray-100'>
      <span className='hidden md:inline'>Update</span> <EditIcon />
    </Link>
  );
}

export function DeleteJob({ id }) {

      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
      function showDeleteModal() {
        setIsDeleteModalOpen(!isDeleteModalOpen);
      }

    const handledeleteJob = async () => {
        try {
            await urls.delete(id);
            setIsDeleteModalOpen(false)
        }catch (e){
            console.log("error delete product",e);
        }

    }
  return (
    <div>
      <button
        onClick={showDeleteModal}
        className='rounded-md border p-2 hover:bg-gray-100'>
        <span className='hidden md:inline'>Delete</span> <DeleteOutlineIcon />
      </button>
      <DeleteModal deleteModalOpen={isDeleteModalOpen} showDeleteModal={showDeleteModal} handledeleteJob={handledeleteJob} />
    </div>
  );
}
