// pages/api/employees.js
import fs from 'fs';
import csvParser from 'csv-parser';

export default async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;

    const data = [];
    fs.createReadStream('C:\\Full-Stack-Internship-Home-Assignment-main\\data\\employees.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', () => {
            // Calculate start and end indices based on pagination parameters
            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;

            // Extract the relevant portion of data for the requested page
            const paginatedData = data.slice(startIndex, endIndex);

            res.status(200).json({
                employees: paginatedData,
                pageInfo: {
                    currentPage: +page,
                    pageSize: +pageSize,
                    totalPages: Math.ceil(data.length / pageSize),
                },
            });
        });
};
