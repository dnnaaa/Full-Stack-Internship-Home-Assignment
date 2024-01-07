// components/ResultsTable.js
import React, {useState} from 'react';
import Pagination from "@/components/Pagination";

const Table = ({ data, columns }) => {
    const [page,setPage] = useState(1);
    const page_size = 8 ;
    let total_pages = Math.floor( data.length /page_size );
    if(data.length % page_size !=0) { ++total_pages;};

    const newData = data.slice(
        (page- 1) * page_size,
        page * page_size,
    );

    const handlePage = (p) => {
        if(p==0 || p> total_pages) { return;}
       setPage(p);
    };


    return (
        <div className="mt-8">
            <table className="table-auto shadow-lg border rounded-md">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column} className="px-4 py-4 border rounded-md border-indigo-300">
                            {column}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {newData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                        {columns.map((column) => (
                            <td key={column} className=" text-center  px-4 py-4">
                                {row[column]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination handlePage={handlePage} page={page} total_pages={total_pages} />
        </div>
    );
};

export default Table;
