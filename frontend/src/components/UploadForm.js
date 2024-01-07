import React from 'react'
import ProcessButton from "@/components/ProcessButton";

const UploadForm = ( {handleSubmit , handleProcess , csvFile, setCsvFile ,isCsvUploaded}) => {

    return (
        <div className=" mt-2 flex justify-center content-center">
            <form onSubmit={handleSubmit} className=" shadow-lg flex flex-col px-6 py-6 w-1/2  border-2 border-indigo-300 rounded-lg">
                <h2 className='text-3xl font-bold text-center mb-6 underline '> Upload your CSV file:</h2>
                <div className="flex flex-row gap-2 mb-2">
                    <label className="basis-1/3 text-md text-green-500 text-right font-semibold " htmlFor='csv_file'>CSV only :</label>
                    <input onChange={(event) => setCsvFile(event.target.files[0])}
                           className="py-1 px-1 border text-center rounded-md border-black"
                           id="csv_file" accept=".csv"  type="file"/>
                </div>

                { csvFile &&  <div className=' mt-4 mb-2 w-full flex justify-center content-center'>
                    <button type="submit"  className=' text-white cursor-pointer hover:w-full w-1/2 py-2 px-3  bg-green-500 text-lg font-semibold border border-black rounded-full'>Save</button>
                </div>
                }
                { isCsvUploaded && <ProcessButton onClickFunction={handleProcess}  />
                }
            </form>
        </div>
    )
}

export default  UploadForm ;