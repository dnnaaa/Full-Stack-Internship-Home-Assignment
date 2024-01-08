import React from 'react';

const JobsTable = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }
  return (
    <div style={{ overflowX: 'auto', textAlign: 'center' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: 'auto' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>job title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>salary average</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job) => (
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{job.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{job.average.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
