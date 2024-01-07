import {useState} from "react";

export const JobSummary = ({data}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const tailleTotal = data?.length ?? 1;
    const totalPage = Math.ceil(tailleTotal / 5);

    const tableRows = data.slice((currentPage - 1) * 5, currentPage * 5).map((jobSalaries) => {
        return (
            <tr key={jobSalaries.job_title} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{jobSalaries.job_title}</td>
                <td className="px-6 py-4">{jobSalaries.salary.toFixed(2)} dhs</td>
            </tr>
        );
    });
    return(
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Job Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Avarage Summary
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows}
                    </tbody>
                </table>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-blue-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing Page<span className="font-semibold text-gray-900 dark:text-blue-600"> {currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-blue-500">{totalPage}</span></span>

                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage===1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                        </li>
                        <li>
                            <button disabled={currentPage===totalPage} onClick={() => setCurrentPage((prev) => prev + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}