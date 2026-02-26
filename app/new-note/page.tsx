import NoteForm from '@/components/NoteForm'
import { FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function NewNotePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Note</h1>
        <NoteForm />
      </div>
    </div>
  )
}
