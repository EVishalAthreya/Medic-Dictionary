// src/components/Favorites.js
import React from 'react';

function Favorites({ favorites }) {
    return (
        <div>
            <h2>Favorites</h2>
            {favorites.length > 0 ? (
                favorites.map((item, index) => (
                    <div key={index}>
                        <h3>{item.word}</h3>
                        {item.definitions.map((meaning, i) => (
                            <div key={i}>
                                <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
                                {meaning.definitions.map((def, j) => (
                                    <p key={j}><strong>Definition {j + 1}:</strong> {def}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>
    );
}

export default Favorites;
