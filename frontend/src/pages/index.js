import CSVUploader from '@/components/CSVUploader'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div><CSVUploader></CSVUploader></div>
    </main>
  )
}
