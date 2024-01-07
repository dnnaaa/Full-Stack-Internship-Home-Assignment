
const ProcessButton = ({ onProcess }) => {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium  flex flex-row items-center px-6 py-4  text-blue rounded-lg shadow-lg tracking-wide uppercase border-2 border-blue-500 cursor-pointer  hover:text-white"
        onClick={onProcess}
      >
        Process
      </button>
    );
  };
  
  export default ProcessButton;
  