import { Inter } from 'next/font/google'
import MainUI from "@/components/MainUi";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`min-h-screen p-14 flex flex-col justify-center ${inter.className}`}
    >
      <MainUI/>
    </main>
  )
}
