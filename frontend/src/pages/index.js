import { Inter } from 'next/font/google'
import Interface1 from 'Interface1';
import React from 'react'; 
import Interface3 from 'Interface3'; 

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <Interface1 />
      <Interface3 />
    </main>
  );
}

