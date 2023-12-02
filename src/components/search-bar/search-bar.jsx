import { useState } from 'react'

// Suchleisten-Komponente
export const SearchBar = ({ onSearch, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = event => {
    setSearchTerm(event.target.value)
    onSearch(event.target.value)
  }

  return (
        <input type="text" value={searchTerm} onChange={handleChange} placeholder="Suche nach Filmen..." />
  )
}

// Hauptkomponente
function MainView ({ movies }) {
  const [filteredMovies, setFilteredMovies] = useState(movies)

  const handleSearch = searchTerm => {
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMovies(results)
  }

  return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {/* Hier sollten Sie Ihre gefilterten Filme anzeigen */}
        </div>
  )
}
