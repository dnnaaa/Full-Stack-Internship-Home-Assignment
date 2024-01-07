import { Inter } from 'next/font/google'
import App from "@/pages/App";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-12 ${inter.className}`}
    >
      DNA Engineering Full-Stack Internship Home Assignment
      <App/>
    </main>
  )
}
