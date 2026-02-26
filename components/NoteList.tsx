import { useEffect, useState } from 'react'
import { FiSearch, FiFileText, FiClock } from 'react-icons/fi'
import Link from 'next/link'
import { Note } from '@/types/note'

type NoteListProps = {
  initialNotes: Note[]
}

export default function NoteList({ initialNotes }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(initialNotes)
  
  useEffect(() => {
    const filtered = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredNotes(filtered)
  }, [searchTerm, notes])
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }
  
  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FiFileText className="text-4xl mx-auto mb-4" />
            <p>No notes found. Create your first note!</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <Link 
              key={note.id}
              href={`/notes/${note.id}`}
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
                <span className="px-2 py-1 bg-primary-light text-primary-dark rounded-full text-sm">
                  {note.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">
                {truncateContent(note.content)}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FiClock />
                  {formatDate(note.updatedAt)}
                </span>
                <span className="text-primary hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
