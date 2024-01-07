import {useState} from "react"


export default function JobsTable({employees}){
    const salaries=calculateAverageSalaryByJob(employees)
    return <div className="flex justify-center" style={{marginTop:"3rem"}}>
        {employees.length>0?
            <div className="w-2/3 border rounded p-3">
                <table className={"w-full"}>
                    <thead>
                    <tr className={"border-b border-black"}><th >Job Title</th><th>Average salary</th></tr></thead>
                    <tbody>
                    {
                        salaries.map((job,key)=>{
                            return <tr className={"h-10 border-b"} key={key}>
                                <td>{job.title}</td>
                                <td>{job.average}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>:""
        }
    </div>
}

// Function used to calculate the average salary by job given the employees records
function calculateAverageSalaryByJob(data) {
    // Create an object to store salaries by job title
    const salaryByJob = {};

    // Iterate over the array and group salaries by job title
    data.forEach((item) => {
        const jobTitle = item.jobTitle;
        const salary = item.salary;

        if (!salaryByJob[jobTitle]) {
            salaryByJob[jobTitle] = { total: 0, count: 0 };
        }

        salaryByJob[jobTitle].total += salary;
        salaryByJob[jobTitle].count++;
    });

    // Calculate average for each job title
    const averageSalaries = [];
    for (const jobTitle in salaryByJob) {
        const total = salaryByJob[jobTitle].total;
        const count = salaryByJob[jobTitle].count;
        const average = total / count;
        averageSalaries.push({"title":jobTitle,"average":Math.round(average)})
    }
    return averageSalaries;
}