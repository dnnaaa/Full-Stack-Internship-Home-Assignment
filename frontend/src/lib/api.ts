// API utility functions for job management
export async function fetchJobs() {
  const response = await fetch('http://localhost:8080/jobs');
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
}

export async function fetchJob(id: string) {
  const response = await fetch(`http://localhost:8080/jobs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job');
  }
  return response.json();
}

export async function createJob(jobData: any) {
  const response = await fetch('http://localhost:8080/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error('Failed to create job');
  }
  return response.json();
}

export async function updateJob(id: string, jobData: any) {
  const response = await fetch(`http://localhost:8080/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error('Failed to update job');
  }
  return response.json();
}

export async function deleteJob(id: string) {
  const response = await fetch(`http://localhost:8080/jobs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
  return response.json();
}