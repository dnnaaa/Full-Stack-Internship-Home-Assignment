import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Assuming 'file' is the key for the file data in the request body
      const file = req.body.file;

      // Update this URL with your actual backend URL
      const backendUrl = 'http://localhost:8081/api/upload';

      // Make a POST request to the backend with the file data
      const response = await axios.post(backendUrl, { file });

      // Respond with the data from the backend
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
