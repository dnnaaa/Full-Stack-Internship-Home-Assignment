import { useState } from 'react';
import UploadFile from '../components/PrincipalePage';


const Index = () => {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);

  const processFile = async () => {

    const processedEmployees = []; 

    setEmployees(processedEmployees);
  };

  return (
    <div>
      <h1>Upload Employee CSV</h1>
      <UploadFile setFile={setFile} />
     
    </div>
  );
};

export default Index;
