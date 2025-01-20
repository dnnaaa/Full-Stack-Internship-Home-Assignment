import axios from 'axios';

// Créer une instance Axios avec la configuration de base
const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // L'URL de base de votre backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;