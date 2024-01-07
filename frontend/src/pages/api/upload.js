// pages/api/upload.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Handle the file upload logic here (for simplicity, assume it's successful)
        res.status(200).json({ message: 'File uploaded successfully' });
      } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  