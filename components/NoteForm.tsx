import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiSave, FiX } from 'react-icons/fi'
import { Note, NoteData, NoteCategories } from '@/types/note'

type NoteFormProps = {
  note?: Note
}

export default function NoteForm({ note }: NoteFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [category, setCategory] = useState<NoteCategories>(note?.category || 'Recipes')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const noteData: NoteData = {
      title,
      content,
      category
    }
    
    try {
      if (note) {
        // Update existing note
        await fetch('/api/notes', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...noteData, id: note.id }),
        })
      } else {
        // Create new note
        await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(noteData),
        })
      }
      
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Failed to save note:', error)
      alert('Failed to save note. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleCancel = () => {
    if (note) {
      router.push(`/notes/${note.id}`)
    } else {
      router.push('/')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          placeholder="Enter note title"
          required
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as NoteCategories)}
          className="input-field"
        >
          <option value="Recipes">Recipes</option>
          <option value="Ingredients">Ingredients</option>
          <option value="Restaurant Reviews">Restaurant Reviews</option>
          <option value="Wine Pairings">Wine Pairings</option>
          <option value="Cocktails">Cocktails</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field min-h-[200px]"
          placeholder="Write your note content here..."
          required
        />
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <FiSave />
          {isSubmitting ? 'Saving...' : (note ? 'Update Note' : 'Save Note')}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
        >
          <FiX /> Cancel
        </button>
      </div>
    </form>
  )
}
