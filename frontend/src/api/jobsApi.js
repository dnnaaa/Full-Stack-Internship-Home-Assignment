import axios from './axios'; // Importer l'instance d'Axios

const BASE_URL = '/jobs'; // Nous n'avons plus besoin de mettre l'URL complète ici

// Fonction pour récupérer tous les jobs
export const fetchJobs = () => axios.get(BASE_URL);

// Fonction pour créer un nouveau job
export const createJob = (job) => axios.post(BASE_URL, job);

// Fonction pour mettre à jour un job existant
export const updateJob = (id, job) => axios.put(`${BASE_URL}/${id}`, job);

// Fonction pour supprimer un job par ID
export const deleteJob = (id) => axios.delete(`${BASE_URL}/${id}`);

// Fonction pour récupérer un job par ID
export const fetchJobById = (id) => axios.get(`${BASE_URL}/${id}`);