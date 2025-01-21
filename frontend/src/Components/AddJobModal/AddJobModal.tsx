import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  isOpen: boolean;
  onClose: (data?: AddJobDto) => void;
}

export interface AddJobDto {
  title: string;
  description: string;
  location: string;
  salary: number;
}

const AddJobModal = (props: ModalProps) => {
  const [FormsValues, setFormsValues] = useState<AddJobDto>({
    title: "",
    description: "",
    location: "",
    salary: 0,
  });

  if (!props.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call onClose to pass the form data
    props.onClose(FormsValues);

    // Show success toast notification
    toast.success("Job added successfully!");

    // Optionally reset the form values after submitting
    setFormsValues({
      title: "",
      description: "",
      location: "",
      salary: 0,
    });
  };

  return (
    <div
      onClick={(e) => props.onClose()}
      className="fixed left-0 top-0 z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative  p-4  max-w-fit max-h-full"
      >
        <div className="relative  bg-white  rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-center  p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900  dark:text-white">
              Create New Job
            </h3>
            <button
              onClick={() => props.onClose()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-12">
              <div className="col-span-6">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Job name"
                  required
                  value={FormsValues?.title || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="your location"
                  required
                  value={FormsValues?.location || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Description
                </label>
                <textarea
                  id="description"
                  value={FormsValues.description}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write Job description here"
                ></textarea>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="codeBarre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  salary
                </label>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type  salary"
                  required
                  value={FormsValues?.salary || ""}
                  onChange={(e) => {
                    setFormsValues((prev) => ({
                      ...prev,
                      salary: Number(e.target.value),
                    }));
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;
