import useAddEditJob from '../hooks/useAddEditJob'
import Button from '../components/Button';
import Input from '../components/Input';
import SuccessModal from '../components/Modal/SuccessModal';

const AddEditJob = () => {
  const {
    job,
    errors,
    jobId,
    handleSubmit,
    handleInputChange,
    handleBack,
    openSuccessModal,
    successMessage,
    handleModalClose
  } = useAddEditJob();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <div className="p-8 md:max-w-2xl w-full bg-blue-900 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-300 mb-6">{jobId ? 'Edit Job' : 'Add Job'}</h1>
        <form onSubmit={handleSubmit}>
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
              multiline
              rows={4}
              className="col-span-1 md:col-span-2" 
            />
            <Input
              label="Salary"
              type="number"
              value={job.salary}
              onChange={handleInputChange('salary')}
              error={errors.salary}
            />
          </div>
          <div className="flex mt-8 justify-end space-x-4">
            <Button 
            type="submit" 
            disabled={Object.keys(errors).length > 0}
            sx={{ borderRadius: '25px' }}
            >
              Save
            </Button>
            <Button 
            onClick={handleBack}
            sx={{ borderRadius: '25px' }}
            >
              Back
            </Button>
          </div>
        </form>
        <SuccessModal
          open={openSuccessModal}
          title="Success"
          message={successMessage}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
};

export default AddEditJob;
