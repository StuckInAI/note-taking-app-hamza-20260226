import { getNoteById } from '@/lib/database'
import { FiEdit, FiTrash2, FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
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
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
          <FiArrowLeft /> Back to all notes
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{note.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="inline-flex items-center gap-1">
                <FiTag />
                <span className="px-2 py-1 bg-primary-light text-primary-dark rounded-full text-sm">
                  {note.category}
                </span>
              </span>
              <span className="inline-flex items-center gap-1">
                <FiCalendar />
                {formatDate(note.updatedAt)}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href={`/notes/${note.id}/edit`}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
            >
              <FiEdit /> Edit
            </Link>
            <DeleteButton noteId={note.id} />
          </div>
        </div>
        
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {note.content}
          </div>
        </div>
      </div>
    </div>
  )
}
