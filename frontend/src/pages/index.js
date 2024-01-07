// pages/index.js
import Interface1 from '../components/Interface1';
import { FileProvider } from '../context/FileContext';

const Index = () => {
  return (
    <FileProvider>
      <Interface1 />
    </FileProvider>
  );
};

export default Index;
