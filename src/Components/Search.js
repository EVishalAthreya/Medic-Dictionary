import React, { useState } from 'react';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const searchTerm = async () => {
        if (query === '') {
            setResults([{ definition: 'Please enter a term to search.' }]);
            return;
        }

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const termResults = [];
                
                // Iterate through all meanings and definitions for the term
                const meanings = data[0].meanings;

                meanings.forEach((meaning) => {
                    meaning.definitions.forEach((def) => {
                        termResults.push({
                            term: query,
                            definition: def.definition,
                            partOfSpeech: meaning.partOfSpeech, // Include the part of speech
                            example: def.example || 'No example available' // Include examples if available
                        });
                    });
                });

                if (termResults.length > 0) {
                    setResults(termResults);
                } else {
                    setResults([{ definition: 'No definition found for this term.' }]);
                }
            } else {
                setResults([{ definition: 'No definition found for this term.' }]);
            }
        } catch (error) {
            setResults([{ definition: 'An error occurred. Please try again.' }]);
        }
    };

    const addToFavorites = (term) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.includes(term)) {
                return [...prevFavorites, term];
            }
            return prevFavorites;
        });
    };

    return (
        <div className="container">
            <h1 className="title">Medic Dictionary</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                />
                <button onClick={searchTerm}>
                    🔍
                </button>
                {results.length > 0 && (
                    <button className="fav-btn" onClick={() => addToFavorites(query)}>
                        ❤ Add to Favorites
                    </button>
                )}
            </div>
            <div className="results">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <div key={index} className="result-item">
                            {result.term && <h3>{result.term}</h3>}
                            <p><strong>Part of Speech:</strong> {result.partOfSpeech}</p>
                            <p>{result.definition}</p>
                            <p><strong>Example:</strong> {result.example}</p>
                        </div>
                    ))
                ) : (
                    <p>No definitions found.</p>
                )}
            </div>
            <div className="side-panel">
                <h3>Favorites</h3>
                <ul>
                    {favorites.length > 0 ? (
                        favorites.map((fav, index) => <li key={index}>{fav}</li>)
                    ) : (
                        <p>No favorites yet!</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Search;
