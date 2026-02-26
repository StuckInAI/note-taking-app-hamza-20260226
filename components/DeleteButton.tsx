import { useRouter } from 'next/navigation'
import { FiTrash2 } from 'react-icons/fi'

type DeleteButtonProps = {
  noteId: number
}

export default function DeleteButton({ noteId }: DeleteButtonProps) {
  const router = useRouter()
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) return
    
    try {
      const response = await fetch('/api/notes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: noteId }),
      })
      
      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        alert('Failed to delete note')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete note')
    }
  }
  
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors inline-flex items-center gap-2"
    >
      <FiTrash2 /> Delete
    </button>
  )
}
