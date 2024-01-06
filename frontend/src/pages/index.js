// src/pages/index.js

import CsvUploader from '../components/CsvUploader';

const Home = () => {
  return (
      <div className="items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-md shadow-md ">
              <h1 className="text-3xl font-bold mb-6 text-center" style={{color: '#3498db'}}>
                  CSV Uploader and Processor
              </h1>
              <CsvUploader/>
          </div>
      </div>
  );
};

export default Home;
