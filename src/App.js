import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [definition, setDefinition] = useState('');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    // Update page title when the query or definition changes
    document.title = query ? `${query} - Medic Dictionary` : 'Medic Dictionary';
  }, [query, definition]);

  const handleSearch = async () => {
    if (!query) return; // Do nothing if search query is empty
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
    if (response.ok) {
      const data = await response.json();
      setDefinition(data[0]?.meanings[0]?.definitions[0]?.definition || 'No definition found');
    } else {
      setDefinition('Term not found');
    }
  };

  const handleAddToFavorites = () => {
    if (query && !favorites.includes(query)) {
      const newFavorites = [...favorites, query];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const handleRemoveFromFavorites = (term) => {
    const newFavorites = favorites.filter(fav => fav !== term);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="app">
      <div className="side-panel">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((term, index) => (
            <li key={index}>
              {term}
              <button onClick={() => handleRemoveFromFavorites(term)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <h1 className="title">Medic Dictionary</h1>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Definition Box */}
        {definition && (
          <div className="definition-box">
            <h3>Definition:</h3>
            <p>{definition}</p>
          </div>
        )}

        {/* Add to Favorites Button */}
        {query && !favorites.includes(query) && (
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        )}
      </div>
    </div>
  );
}

export default App;
