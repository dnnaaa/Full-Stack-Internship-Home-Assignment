import {useState} from "react";

export const ParsedFileResult = ({ data }) => {
    const itemsbyPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const indexLastElt = currentPage*itemsbyPage;
    const indexFirstElt = indexLastElt - itemsbyPage;
    const currentIems = data.slice(indexFirstElt, indexLastElt);
    const pagination = (nber) => setCurrentPage(nber);
    return (
        <>
            <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Employee
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Job Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Salary
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {data && data.length > 0 && currentIems.map( (row) => (
                        <tr key={row.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {row.id}
                            </th>
                            <td className="px-6 py-4">{row.employee_name}</td>
                            <td className="px-6 py-4">{row.job_title}</td>
                            <td className="px-6 py-4">{row.salary} dhs</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {data.length > itemsbyPage && (
                <nav className="flex justify-end mb-3 md:flex-row pt-4" aria-label="Table navigation">
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button onClick={() => pagination(currentPage-1)} disabled={currentPage===1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                        </li>
                        {[1, 2, 3].map((i) => (
                            <li key={i}>
                                <button disabled={currentPage===i+1} onClick={() => pagination(i+1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                                    currentPage === i + 1
                                        ? 'text-gray-700 bg-gray-100'
                                        : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}>{i+1}</button>
                            </li>
                        ))}
                        {
                            data.length > 30 && (
                                <li>
                                    <button disabled={true} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">......</button>
                                </li>
                            )
                        }

                        {currentPage > 3 && (
                            <>
                                <li>
                                    <button   className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                                        currentPage === currentPage
                                            ? 'text-gray-700 bg-gray-100'
                                            : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                    }`}>{currentPage+1}</button>
                                </li>
                            </>
                        )}

                        <li>
                            <button disabled={currentPage===indexLastElt} onClick={() => pagination(currentPage +1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};
