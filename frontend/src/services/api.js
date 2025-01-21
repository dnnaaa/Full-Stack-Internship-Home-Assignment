import axios from 'axios';

// Définir la base URL de l'API
const API_BASE_URL = "http://localhost:8080/jobs";


// Récupérer toutes les offres d'emploi
/*export const fetchJobs = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};*/
export const fetchJobs = async () => {
    try {
        const response = await axios.get('http://localhost:8080/jobs');
        return response.data; // Retourner les données
    } catch (error) {
        console.error('Network Error:', error);
        throw error; // Relancez l'erreur pour permettre au composant de gérer les échecs
    }
};


// Ajouter une nouvelle offre
export const createJob = async (job) => {
    const response = await axios.post(API_BASE_URL, job);
    return response.data;
};

// Mettre à jour une offre
export const updateJob = async (id, job) => {
  try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, job);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      throw error;
  }
    
};

// Supprimer une offre
export const deleteJob = async (id) => {
  try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    
  } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      throw error;
  }
    
};

