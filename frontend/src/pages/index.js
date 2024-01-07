import React, { useState } from 'react';
import UploadButton from '../components/UploadButton';
import { useFile } from '@/context/FileContext';
import { useRouter } from 'next/router';

const Home = () => {
  const { setFile } = useFile();
  const router = useRouter();

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    router.push('/cancelProcess');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="text-center p-8 border-2 border-white rounded-md bg-white shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <UploadButton onFileChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Home;
