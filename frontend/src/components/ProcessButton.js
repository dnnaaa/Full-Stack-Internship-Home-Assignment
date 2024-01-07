// components/ProcessButton.js
// components/ProcessButton.js
import { useRouter } from 'next/router';

const ProcessButton = ({ onProcessClick }) => {
    const router = useRouter();

    const handleProcessClick = () => {
       console.log("clicked")
        // Redirect to the results page
        router.push('/Results');
    };

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleProcessClick}>Process</button>
    );
};
export default ProcessButton;
