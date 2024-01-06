
import NavBar from '@/components/navBar/NavBar'
import Upload from '@/components/upload/Upload'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
    >
      <NavBar />
      <Upload />
    </main>
  )
}
