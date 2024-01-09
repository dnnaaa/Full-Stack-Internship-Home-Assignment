import { Inter } from 'next/font/google'
import Employees from './Views/Employees'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <main className={`flex min-h-screen flex-col justify-between p-24 ${inter.className}`} >
        <Employees />
      </main>
    </>
  )
}
