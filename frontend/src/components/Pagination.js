import React from "react"

const Pagination = ({handlePage,page,total_pages}) => {

    return (
        <div className=' mt-4 flex justify-center content-center mb-4'>
            <nav className="isolate inline-flex -space-x-px  rounded-md shadow-sm" aria-label="Pagination">
                <a onClick={()=> handlePage((page-1))} className=" hover:bg-blue-600 relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only ">Previous</span>
                    <svg className=" h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                </a>
                <div className=" flex justify-center content-center ">
                    <p className='px-2 font-bold'>Page {page} of {total_pages} </p>
                </div>
                <a onClick={()=> handlePage((page+1))} className=" hover:bg-blue-600 relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </a>
            </nav>
        </div>
    )
}

export default Pagination;