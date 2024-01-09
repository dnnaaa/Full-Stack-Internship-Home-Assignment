import { Inter } from "next/font/google";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

import { useState } from "react";
import axios from "axios";
import UploadForm from "@/components/UploadForm";
import ProcessButton from "@/components/ProcessButton";
import ErrorComponent from "@/components/ErrorComponent";
import ResultsPage from "./results";
const Index = () => {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:8080/api/csv/upload", formData)
      .then((response) => {
        // Handle success, e.g., update state with response data
        console.log("uploaded successufully");
        router.push("/results");
      })
      .catch((error) => {
        // Handle error
        <ErrorComponent message={error}></ErrorComponent>;
      });
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      DNA Engineering Full-Stack Internship Home Assignment
      <UploadForm onFileChange={onFileChange}></UploadForm>
      <ProcessButton onClick={onUpload}></ProcessButton>
    </main>
  );
};

export default Index;
