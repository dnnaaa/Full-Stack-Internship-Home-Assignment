// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await fetch('http://localhost:8080/api/employee');
  const response2 = await fetch('http://localhost:8080/api/JobSummary');
  const employees = await response.json();
  const jobSummary = await response2.json();

  const combinedData = { employees, jobSummary };

  res.status(200).json(combinedData);
}
