'use client';
import '@/styles/globals.css';
import Providers from './Providers';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='height'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
