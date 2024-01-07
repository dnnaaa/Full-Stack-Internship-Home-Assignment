import React, { useEffect } from 'react';
import ProcessButton from '@/components/ProcessButton';
import CancelButton from '@/components/CancelButton';
import { useRouter } from 'next/router';
import { useFile } from '@/context/FileContext';

const CancelProcess = () => {
  const router = useRouter();
  const { selectedFile } = useFile();

  const handleButtonClick = () => {
    router.push('/process');
  };

  const handleCancelClick = () => {
    router.push('/');
  };

  useEffect(() => {
    if (!selectedFile) {
      router.push('/');
    }
  }, [selectedFile, router]);

  if (!selectedFile) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="text-center p-8 border-2 border-white rounded-md bg-white shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex items-center justify-center min-h-64 bg-gray-100 rounded-md p-6">
          <div className="flex space-x-4">
            <CancelButton onClick={handleCancelClick} />
            <ProcessButton onClick={handleButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelProcess;
