// pages/index.js
import { useState, useEffect } from 'react';
import FileUpload from '../componennts/FileUpload';
import EmployeeTable from '../componennts/EmployeeTable';
import ReactPaginate from 'react-paginate';
import styles from '../styles/Home.module.css'; // Import your CSS file

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [pageInfo, setPageInfo] = useState({ currentPage: 1, pageSize: 10, totalPages: 1 });

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/employees/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
                fetchData(); // Fetch data after successful file upload
            } else {
                console.error('File upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    const fetchData = async (page = 1, pageSize = 10) => {
        try {
            const response = await fetch(`/api/employees?page=${page}&pageSize=${pageSize}`);
            const data = await response.json();

            setEmployees(data.employees);
            setPageInfo(data.pageInfo);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch initial data when the component mounts
    }, []);

    const handlePageChange = ({ selected }) => {
        fetchData(selected + 1);
    };

    return (
        <main className="flex min-h-screen flex-col items-center text-center p-24">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">  <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">DNA</mark>Engineering <span className="text-blue-600 dark:text-blue-500">Full-Stack</span> Internship <span className="text-blue-600 dark:text-blue-500">Home</span> Assignment</h1>
            <FileUpload onFileUpload={handleFileUpload} />

            <section>
                <h2 className="inline-flex items-center justify-center px-24 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Employee Information</h2>
                <EmployeeTable employees={employees} />
            </section>

            <ReactPaginate
                pageCount={pageInfo.totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                pageClassName={styles.page}
            />
        </main>
    );
};

export default Home;
