'use client';
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, RotateCcw, Save } from 'lucide-react';

export default function JobForm() {
  const [id, setId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idTemp = urlParams.get('id') || undefined;
    setIsUpdate(Boolean(idTemp));
    setId(idTemp);
  }, []);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    location: '',
    salary: 0,
  });

  useEffect(() => {
    if (isUpdate && id) {
      fetchJob(id);
    }
  }, [isUpdate, id]);

  const fetchJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:8080/job/${jobId}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      setError("Erreur lors du chargement du JOB");
      // Redirection vers la liste en cas d'erreur
      window.history.back();
    }
  };

 

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className='p-6'>
      <div className='bg-white rounded-lg shadow-lg'>
        <div className='p-6'>
          <h2 className='text-xl font-semibold mb-6'>
            Affichage d'un job
          </h2>

     

          <form  className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Code */}
              <div className='space-y-2'>
                <label className="block text-sm font-medium text-gray-700 ">
                  Title
                </label>
                <div
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  >
                  {formData.title}
                </div>
              </div>

              {/* Nom */}
              <div className='space-y-2'>
                <label className="block text-sm font-medium text-gray-700 ">
                  Location
                </label>
                <div
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  >
                  {formData.location}
                </div>
              </div>

              {/* Code Transmission */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Salary
                </label>
                <div
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  >
                  {formData.salary}
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Description */}
              <div className='md:col-span-2 space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <div
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`}
                  >
                  {formData.description}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className='flex justify-end space-x-4 mt-6'>
              <button
                type='button'
                onClick={goBack}
                className='flex items-center px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Retour
              </button>

            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
