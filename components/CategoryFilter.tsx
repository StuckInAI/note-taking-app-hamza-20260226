import { useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import { NoteCategories } from '@/types/note'

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const categories: NoteCategories[] = [
    'Recipes',
    'Ingredients',
    'Restaurant Reviews',
    'Wine Pairings',
    'Cocktails'
  ]
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <FiFilter className="text-gray-600" />
        <h3 className="font-bold text-gray-800">Filter by Category</h3>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full text-left px-3 py-2 rounded ${selectedCategory === null ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left px-3 py-2 rounded ${selectedCategory === category ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
