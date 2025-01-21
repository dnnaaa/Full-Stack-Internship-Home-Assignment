'use client';

import JobListPage from './jobs/JobPage';
import { ToastProvider } from './context/ToastProvider';
import Navbar from './context/Trofel';

export default function HomePage() {
  return (
    <ToastProvider>
      <div className='h-screen bg-gray-100'>
        <Navbar />
        <div className='flex justify-center'>
          <JobListPage />
        </div>
      </div>
    </ToastProvider>
  );
}
