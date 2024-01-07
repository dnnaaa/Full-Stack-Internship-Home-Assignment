
const UploadButton = ({ onFileSelect }) => {
  return (
    <div className="flex justify-center items-center w-full py-2">
      <label className="flex flex-row items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border-[1px] border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M16.7,5.3l-1.4-1.4c-0.2-0.2-0.5-0.3-0.7-0.3h-4V0H5.4C4.6,0,4,0.6,4,1.3v17.3C4,19.4,4.6,20,5.4,20h9.3
          c0.7,0,1.3-0.6,1.3-1.3V6C16.9,5.8,16.9,5.5,16.7,5.3z M10,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S11.7,15,10,15z
          M14,8V3.5L16.5,6H14z"/>
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input type='file' className="hidden"  accept=".csv" onChange={onFileSelect} />
      </label>
    </div>
  );
};

export default UploadButton;
