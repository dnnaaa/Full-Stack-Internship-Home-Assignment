import React, {  useState } from "react";
import { useMutation } from "react-query";
import { getAllEmployeesAndJobAverage } from "../apiInstance/getAllEmployeesAndJobAverage";
import EmployeeInformation from "./EmployeeInformation";
import JobSummary from "./JobSummary";
import image from "../images/image.gif"

export default function UploadFileAndProcess() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [listOfAverages, setListOfAverages] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileSizeInKb, setFileSizeInKb] = useState(0);
  const { mutate: mutations, isLoading } = useMutation(
    getAllEmployeesAndJobAverage,
    {
      onSuccess: (data) => {
        setEmployeeList(data.employeeList);
        setListOfAverages(data.listOfAverages);
      },
    }
  );

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxSize = 10000 * 1024; //10 Mb
    if (selectedFile) {
      const fileSize = selectedFile.size;
      if (fileSize < maxSize) {
        setSelectedFile(event.target.files[0]);
        setFileSizeInKb(fileSize / 1024);
        setFileName(selectedFile.name);
      } else alert("Unsuported file size Max 10Mo (10000kb)");
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      mutations(formData);
    } else alert("choose a file");
  };
  return (
    <div>
      <div className="flex flex-col max-sm:w-auto w-96 h-24 mx-auto mt-12 mb-12">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100   "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            {fileName === "" ? (
              <div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  csv file (Max: 10Mo )
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-row gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 20 20">
                    <path d="M17.927,5.828h-4.41l-1.929-1.961c-0.078-0.079-0.186-0.125-0.297-0.125H4.159c-0.229,0-0.417,0.188-0.417,0.417v1.669H2.073c-0.229,0-0.417,0.188-0.417,0.417v9.596c0,0.229,0.188,0.417,0.417,0.417h15.854c0.229,0,0.417-0.188,0.417-0.417V6.245C18.344,6.016,18.156,5.828,17.927,5.828 M4.577,4.577h6.539l1.231,1.251h-7.77V4.577z M17.51,15.424H2.491V6.663H17.51V15.424z"></path>
                  </svg>
                  <p>{fileName}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  file size: {fileSizeInKb.toFixed(2)} (KB)
                </p>
              </div>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            onClick={handleFileUpload}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#FF7900] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  "
          >
            Process
          </button>
        </div>
      </div>
      {isLoading && (
          <img src={image} alt="gif" className="m-auto"/>
          )}
      {(listOfAverages.length>0 && employeeList.length>0 )?(
        <div className="flex lg:flex-row justify-evenly md:flex-col max-sm:flex-col">
          <div className="mt-24">
            <div className="flex justify-center items-center m-auto rounded-3xl h-10 w-fit p-4 mb-4 bg-blue-300">
              <h2 className="text-center font-bold text-lg font-mono">
                {" "}
                Employee Details
              </h2>
            </div>
            {employeeList.length > 0 && (
              <EmployeeInformation TABLE_ROWS={employeeList} />
            )}
          </div>
          <div className="mt-24">
            <div className="flex justify-center items-center m-auto rounded-3xl h-10 w-fit p-4 mb-4 bg-blue-300">
              <h2 className="text-center font-bold text-lg font-mono">
                {" "}
                Jobs Summary
              </h2>
            </div>
            {employeeList.length > 0 && (
              <JobSummary TABLE_ROWS={listOfAverages} />
            )}
          </div>
        </div>
      ): null}
    </div>
  );
}
