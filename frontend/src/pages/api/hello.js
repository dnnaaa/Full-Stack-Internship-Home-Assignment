// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}


// pages/api/upload.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Handle the file upload logic here
      // For simplicity, let's assume it's successful
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error handling file upload:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
