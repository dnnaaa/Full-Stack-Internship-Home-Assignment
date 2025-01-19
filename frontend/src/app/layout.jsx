'use client';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify'; 

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='height'>
        {children}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} />
      </body>
    </html>
  );
}
