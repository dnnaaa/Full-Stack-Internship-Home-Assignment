import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import { Card, CardContent } from '@components/ui/card';
import { Loader2 } from 'lucide-react';

export default function JobForm({
                                  open,
                                  onClose,
                                  onSubmit,
                                  initialData,
                                  loading,
                                }) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      location: '',
      salary: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
            {initialData ? 'Edit Job Position' : 'Create New Job Position'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <Card className='border-none shadow-none'>
            <CardContent className='space-y-6 p-0'>
              <div className='space-y-2'>
                <Label
                  htmlFor='title'
                  className='text-sm font-semibold text-gray-700'>
                  Job Title
                </Label>
                <Input
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  placeholder='e.g. Senior Software Engineer'
                  className='transition-all focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='description'
                  className='text-sm font-semibold text-gray-700'>
                  Job Description
                </Label>
                <Textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={4}
                  placeholder='Describe the role, responsibilities, and requirements...'
                  className='resize-none transition-all focus:ring-2 focus:ring-indigo-500'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='location'
                    className='text-sm font-semibold text-gray-700'>
                    Location
                  </Label>
                  <Input
                    id='location'
                    name='location'
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder='e.g. Remote, New York'
                    className='transition-all focus:ring-2 focus:ring-indigo-500'
                  />
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='salary'
                    className='text-sm font-semibold text-gray-700'>
                    Annual Salary
                  </Label>
                  <Input
                    id='salary'
                    name='salary'
                    type='number'
                    value={formData.salary}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder='e.g. 120000'
                    className='transition-all focus:ring-2 focus:ring-indigo-500'
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className='sm:justify-end'>
            <div className='flex gap-3'>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                disabled={loading}
                className='w-24'>
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading || !formData.title || !formData.description}
                className='w-24 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'>
                {loading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : initialData ? (
                  'Update'
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
