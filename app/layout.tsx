import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Food & Drink Notes',
  description: 'A note-taking app for food and drink enthusiasts',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-4 text-center text-gray-600">
          <p>© 2024 Food & Drink Notes App</p>
        </footer>
      </body>
    </html>
  )
}
