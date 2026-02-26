import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export type NoteCategories = 'Recipes' | 'Ingredients' | 'Restaurant Reviews' | 'Wine Pairings' | 'Cocktails'

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column('text')
  content!: string

  @Column({
    type: 'varchar',
    default: 'Recipes'
  })
  category!: NoteCategories

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
