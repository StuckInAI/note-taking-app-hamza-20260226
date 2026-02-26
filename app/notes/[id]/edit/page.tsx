import { getNoteById } from '@/lib/database'
import NoteForm from '@/components/NoteForm'
import { FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default async function EditNotePage({ params }: { params: { id: string } }) {
  const note = await getNoteById(parseInt(params.id))
  
  if (!note) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Note not found</h1>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    )
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/notes/${note.id}`} className="text-primary hover:underline inline-flex items-center gap-2">
          <FiArrowLeft /> Back to note
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Note</h1>
        <NoteForm note={note} />
      </div>
    </div>
  )
}
