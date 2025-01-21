import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function DeleteConfirmationDialog({
                                           isOpen,
                                           onClose,
                                           onConfirm,
                                           jobTitle,
                                           loading,
                                         }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Dialog */}
      <div className='relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden'>
        {/* Header */}
        <div className='bg-red-50 p-6'>
          <div className='flex items-center gap-4'>
            <div className='flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
              <AlertTriangle className='w-6 h-6 text-red-600' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-red-600'>
                Confirm Deletion
              </h3>
              <p className='text-sm text-red-600/80 mt-1'>
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-6'>
          <p className='text-gray-600'>
            Are you sure you want to delete the job position:
            <span className='block mt-2 text-gray-900 font-medium'>
              "{jobTitle}"
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className='bg-gray-50 px-6 py-4 flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            disabled={loading}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors'>
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={loading}
            className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors'>
            {loading ? 'Deleting...' : 'Delete Job'}
          </button>
        </div>
      </div>
    </div>
  );
}
