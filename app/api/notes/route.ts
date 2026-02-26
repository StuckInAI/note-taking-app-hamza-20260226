import { NextRequest, NextResponse } from 'next/server'
import { 
  createNote, 
  getAllNotes, 
  updateNote, 
  deleteNote,
  NoteData 
} from '@/lib/database'

export async function GET() {
  try {
    const notes = await getAllNotes()
    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: NoteData = await request.json()
    const note = await createNote(data)
    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data: NoteData & { id: number } = await request.json()
    const note = await updateNote(data.id, data)
    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await deleteNote(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    )
  }
}
