import useAddEditJob from '../hooks/useAddEditJob'; // Custom hook for managing job state and logic
import Button from '../components/Button'; // Custom Button component
import Input from '../components/Input'; // Custom Input component
import SuccessModal from '../components/Modal/SuccessModal'; // Success modal component

/**
 * Component for adding or editing a job.
 * Displays a form with fields for job details and handles submission, validation, and success messages.
 */
const AddEditJob = () => {
  // Destructure state and handlers from the custom hook
  const {
    job, // Job details (title, description, location, salary)
    errors, // Validation errors for form fields
    jobId, // Job ID (if editing an existing job)
    handleSubmit, // Function to handle form submission
    handleInputChange, // Function to handle input changes
    handleBack, // Function to navigate back to the job list
    openSuccessModal, // State to control success modal visibility
    successMessage, // Message to display in the success modal
    handleModalClose, // Function to close the success modal
  } = useAddEditJob();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      {/* Container for the form */}
      <div className="p-8 md:max-w-2xl w-full bg-blue-900 rounded-3xl shadow-lg">
        {/* Form title */}
        <h1 className="text-3xl font-bold text-gray-300 mb-6">
          {jobId ? 'Edit Job' : 'Add Job'}
        </h1>
        
        {/* Job form */}
        <form onSubmit={handleSubmit}>
          {/* Form fields organized into a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Title *"
              value={job.title}
              onChange={handleInputChange('title')}
              error={errors.title}
              required
            />
            <Input
              label="Location"
              value={job.location}
              onChange={handleInputChange('location')}
            />
            <Input
              label="Description *"
              value={job.description}
              onChange={handleInputChange('description')}
              error={errors.description}
              required
              multiline // Enables multi-line input
              rows={4} // Sets the height of the text area
              className="col-span-1 md:col-span-2" // Spans across two columns for larger screens
            />
            <Input
              label="Salary"
              type="number"
              value={job.salary}
              onChange={handleInputChange('salary')}
              error={errors.salary}
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex mt-8 justify-end space-x-4">
            <Button
              type="submit"
              disabled={Object.keys(errors).length > 0} // Disable button if there are validation errors
              sx={{ borderRadius: '25px' }}
            >
              Save
            </Button>
            <Button
              onClick={handleBack} // Navigate back to the job list
              sx={{ borderRadius: '25px' }}
            >
              Back
            </Button>
          </div>
        </form>

        {/* Success modal */}
        <SuccessModal
          open={openSuccessModal} // Control modal visibility
          title="Success" // Modal title
          message={successMessage} // Message to display in the modal
          onClose={handleModalClose} // Close modal and navigate back
        />
      </div>
    </div>
  );
};

export default AddEditJob;
