
import React, { useRef } from 'react';
import JobSummaryTable from './jobSummary';
import EmployeeTable from './employees';

const ResultPage = () => {
return(
<div><EmployeeTable/>
<JobSummaryTable/>
</div>
);

}
export default ResultPage 