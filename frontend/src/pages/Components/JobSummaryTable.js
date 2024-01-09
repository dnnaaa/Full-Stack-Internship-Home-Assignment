
export default function JobSummaryTable({ jobSummary }) {

    return (
        <div className="table-container">
            <h2 className="h2">Jobs Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Average Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(jobSummary).map((jobTitle) => (
                            <tr key={jobTitle}>
                                <td>{jobTitle}</td>
                                <td>{jobSummary[jobTitle]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
