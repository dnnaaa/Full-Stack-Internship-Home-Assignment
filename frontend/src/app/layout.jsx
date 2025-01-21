import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "JobBoard - Find Your Next Opportunity",
  description: "Discover and apply to the latest job openings",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} flex h-full flex-col`}>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">Job Board</span>
              </Link>
              <nav className="flex space-x-4">
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Jobs
                </Link>
                <Link href="/add-job" className="text-gray-500 hover:text-gray-900">
                  Post a Job
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

