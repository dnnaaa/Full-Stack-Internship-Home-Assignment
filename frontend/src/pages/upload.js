import { Inter } from "next/font/google";
import Link from "next/link";
import { useFile } from "../FileProvider";

const inter = Inter({ subsets: ["latin"] });

//here we define the two firsts UIs: upload file and process
//we get the csv from user and then we setted in our selectedFile state so we can use it afterfor process
export default function Upload() {
  const { selectedFile, setSelectedFile } = useFile();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <main
      className={`bg-blue-700 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {selectedFile
            ? `${selectedFile.name}  Succefly Uploaded!`
            : "Hello There! Uplaod Your Employees CSV File"}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {selectedFile
            ? "Click on the process button to display the results based on your csv file, or click on uplaod to change the file."
            : "click on the button and uplaod your csv file to process your employees data"}
        </p>
        <div>
          <label className="inline-flex items-center cursor-pointer px-3 py-2 mr-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {selectedFile ? "Change File" : "Upload Csv File"}
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
          </label>
          {selectedFile && (
            <Link
              href={{
                pathname: "/process",
              }}
            >
              <label className="inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Process
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </label>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
