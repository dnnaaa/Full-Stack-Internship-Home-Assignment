export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:8080/api/uploadCSV', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Erreur lors du téléchargement du fichier.');
    }
  } catch (error) {
    throw new Error('Erreur de réseau : ' + error.message);
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/employees');

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Erreur lors de la récupération des employés.');
    }
  } catch (error) {
    throw new Error('Erreur de réseau : ' + error.message);
  }
};

export const fetchJobSummaries = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/jobSummaries');

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Erreur lors de la récupération des résumés des emplois.');
    }
  } catch (error) {
    throw new Error('Erreur de réseau : ' + error.message);
  }
};
