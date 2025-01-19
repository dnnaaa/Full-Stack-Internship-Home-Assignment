import '../styles/globals.css'; // Correct import path

export const metadata = {
  title: 'Job Management System',
  description: 'Manage job posts with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}