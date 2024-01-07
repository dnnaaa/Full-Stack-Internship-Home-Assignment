import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import ResultsTable from "../components/ResultsTable";
import AverageSalariesTable from "../components/AverageSalariesTable";
import { useFile } from "@/context/FileContext";

const Home = () => {
  const { selectedFile } = useFile();
  const [results, setResults] = useState(null);
  const router = useRouter(); 

  const getData = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8081/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error("Error processing the CSV file.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      getData(selectedFile);
    } else {
      router.push("/");
    }
  }, [selectedFile, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div
        className="text-center p-8 border-2 border-white rounded-md bg-white shadow-md"
        style={{ width: "80%" }}
      >
        {results ? (
          <div>
            <ResultsTable results={results} />
            <AverageSalariesTable averageSalaries={results.averageSalaries} />
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Home;
