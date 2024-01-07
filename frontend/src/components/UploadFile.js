import {useState} from "react";

export const UploadFile = ({performUpload}) => {
    const handleFileChange = (event) => {
        performUpload(event.target.files[0]);
    }
    return(
        <>
            <div className={"h-24"}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Your Csv File</label>
                <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            </div>

        </>

    )
}