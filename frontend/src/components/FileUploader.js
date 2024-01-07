import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';


const FileUploader=({onFileUpload})=>{

    const [file,setFile]=useState(null);
    const router=useRouter();



    const handleFileChange=(event)=>{
        setFile(event.target.files[0]);

    };

    const handleUpload=async ()=>{

        if(file){

            const formData=new FormData();
            formData.append('file',file);

            try{
                const response= await axios.post('http://localhost:9093/api/employees/upload',formData,{
                    headers:{ 'Content-Type': 'multipart/form-data'},
        
                });

                console.log(response.data)


                if(onFileUpload){
                    onFileUpload();
                   
                }

                alert('File uploaded successfully!');
                router.push('/process');

            }catch (error){

                console.error('Error uploading file:',error);

            }

        }


    };

    return (
        <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={() => router.push('/process')}>Process</button>

        

      </div>
    );

};

export default FileUploader;