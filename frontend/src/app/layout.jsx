'use client';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
