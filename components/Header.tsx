import Link from 'next/link'
import { FiBook } from 'react-icons/fi'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <FiBook className="text-2xl" />
            Food & Drink Notes
          </Link>
          
          <div className="flex gap-4">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/new-note" 
              className="text-gray-700 hover:text-primary transition-colors"
            >
              New Note
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
