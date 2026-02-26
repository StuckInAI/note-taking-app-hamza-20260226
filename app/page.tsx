import NoteList from '@/components/NoteList'
import CategoryFilter from '@/components/CategoryFilter'
import { FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import { getAllNotes } from '@/lib/database'

export default async function Home() {
  const notes = await getAllNotes()
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Food & Drink Notes</h1>
        <p className="text-gray-600">Record your culinary adventures, recipes, and dining experiences</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/4">
          <CategoryFilter />
          <Link 
            href="/new-note" 
            className="mt-4 w-full btn-primary flex items-center justify-center gap-2"
          >
            <FiPlus /> New Note
          </Link>
        </div>
        
        <div className="md:w-3/4">
          <NoteList initialNotes={notes} />
        </div>
      </div>
    </div>
  )
}
