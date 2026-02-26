import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Note } from '@/types/note'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Note],
  migrations: [],
  subscribers: [],
})

// Initialize the database connection
let initialized = false

export async function initializeDatabase() {
  if (!initialized) {
    try {
      await AppDataSource.initialize()
      initialized = true
      console.log('Database connection initialized')
    } catch (error) {
      console.error('Error initializing database:', error)
      throw error
    }
  }
  return AppDataSource
}

export type NoteData = {
  title: string
  content: string
  category: 'Recipes' | 'Ingredients' | 'Restaurant Reviews' | 'Wine Pairings' | 'Cocktails'
}

export async function createNote(data: NoteData): Promise<Note> {
  const connection = await initializeDatabase()
  const noteRepository = connection.getRepository(Note)
  
  const note = new Note()
  note.title = data.title
  note.content = data.content
  note.category = data.category
  note.createdAt = new Date()
  note.updatedAt = new Date()
  
  return await noteRepository.save(note)
}

export async function getAllNotes(): Promise<Note[]> {
  const connection = await initializeDatabase()
  const noteRepository = connection.getRepository(Note)
  return await noteRepository.find({
    order: {
      updatedAt: 'DESC'
    }
  })
}

export async function getNoteById(id: number): Promise<Note | null> {
  const connection = await initializeDatabase()
  const noteRepository = connection.getRepository(Note)
  return await noteRepository.findOneBy({ id })
}

export async function updateNote(id: number, data: NoteData): Promise<Note | null> {
  const connection = await initializeDatabase()
  const noteRepository = connection.getRepository(Note)
  
  const note = await noteRepository.findOneBy({ id })
  if (!note) return null
  
  note.title = data.title
  note.content = data.content
  note.category = data.category
  note.updatedAt = new Date()
  
  return await noteRepository.save(note)
}

export async function deleteNote(id: number): Promise<void> {
  const connection = await initializeDatabase()
  const noteRepository = connection.getRepository(Note)
  await noteRepository.delete(id)
}
