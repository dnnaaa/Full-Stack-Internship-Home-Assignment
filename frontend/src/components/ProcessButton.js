import React from 'react'

 const ProcessButton = ( { onClickFunction , }) => {
   return (
       <div className=' mt-4 mb-2 w-full flex justify-center content-center'>
           <button
           onClick={onClickFunction}

           className=' text-white cursor-pointer hover:w-full w-1/2 py-2 px-3  bg-blue-500 text-lg font-semibold border border-black rounded-full'>
            Process the file
           </button>
       </div>
   )
}

export default ProcessButton;