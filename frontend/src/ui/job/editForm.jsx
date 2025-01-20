'use client';

import urls from '@/services/urls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const EditForm = ({ id }) => {
  const [updateForm, setUpdateForm] = useState({
    title: '',
    location: '',
    description: '',
    salary: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchJobDataById = async () => {
      try {
        const response = await urls.getById(id);
        const data = response.data;
        setUpdateForm({
          title: data.title || '',
          location: data.location || '',
          description: data.description || '',
          salary: data.salary || 0,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchJobDataById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    updateJob(updateForm);
  };

  async function updateJob(updateFormData) {
    await urls.update(id, updateFormData).catch((e) => {
      console.log('error edit job', e);
    });
  }

  return (
    <>
      <div className='w-full p-8'>
        <h1 className='mb-8 text-xl md:text-2xl'>Create New Job</h1>
        <form onSubmit={updateSubmit}>
          <div className='grid gap-4 mb-4 grid-cols-2 mt-2'>
            <div className='relative px-5 z-0 w-full mb-1 group col-span-2 sm:col-span-1'>
              <label
                htmlFor='title-input-update'
                className='block text-sm font-medium text-gray-900 '>
                Ttile
              </label>
              <input
                name='title'
                onChange={handleChange}
                value={updateForm.title}
                placeholder='Write title...'
                type='text'
                id='title-input-update'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div className='relative px-5 z-0 w-full mb-1 group col-span-2 sm:col-span-1'>
              <label
                htmlFor='location-input'
                className='block  text-sm font-medium text-gray-900 '>
                location
              </label>
              <input
                name='location'
                onChange={handleChange}
                value={updateForm.location}
                placeholder='Write location...'
                type='text'
                id='location-input'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div className='relative z-0 w-full px-5 mb-1 group col-span-2'>
              <label
                htmlFor='description-input'
                className='block  text-sm font-medium text-gray-900'>
                Description
              </label>
              <textarea
                name='description'
                value={updateForm.description}
                onChange={handleChange}
                id='description-input'
                rows={3}
                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none'
                placeholder='Write your description here...'></textarea>
            </div>
            <div className='relative px-5 z-0 w-full mb-1 group col-span-2 sm:col-span-1'>
              <label
                htmlFor='salary-input'
                className='block  text-sm font-medium text-gray-900 '>
                Salary
              </label>
              <input
                name='salary'
                onChange={handleChange}
                value={updateForm.salary}
                placeholder='Write your salary here...'
                type='price'
                id='salary-input'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div className='flex justify-self-end p-6 space-x-2 border-gray-200 rounded-b'>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                onClick={() => router.push(`/`)}
                >
                Edit
              </button>
              <Link
                href='/'
                className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
