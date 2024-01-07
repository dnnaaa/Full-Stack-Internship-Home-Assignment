// components/JobSummaryTable.js
const JobSummaryTable = ({ jobSummary }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Job Title</th>
                <th>Average Salary</th>
            </tr>
            </thead>
            <tbody>
            {jobSummary && jobSummary.map((summary) => (
                <tr key={summary.jobTitle}>
                    <td>{summary.jobTitle}</td>
                    <td>{summary.averageSalary}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default JobSummaryTable;
