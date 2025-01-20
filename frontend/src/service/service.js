const url = 'http://localhost:8080/api/jobs';

export const getJobs = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data with fetch:', error);
        return [];
    }
};

export  async function postJob(job) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(job),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

    } catch (error) {
        console.error('Error posting data:', error);
    }
}


export async function deleteJob(jobId) {
    try {
        const response = await fetch(`${url}/${jobId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete item. Status: ${response.status}`);
        }
        return `Item with ID ${jobId} was successfully deleted.`;
    } catch (error) {
        return `Error deleting item: ${error.message}` ;
    }
}


export async function getJobByID(id){
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data with fetch:', error);
        return {};
    }
}

export async function updateJob(id, updatedJob) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedJob),
        });

        if (!response.ok) {
            throw new Error('Failed to update the job');
        }

        const data = await response.json();

    } catch (error) {
        console.error('Error updating job:', error);

    }
}



