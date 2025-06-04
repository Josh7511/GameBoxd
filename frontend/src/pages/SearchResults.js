import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:8000/api/search-igdb/?query=${query}`)
    .then(response => response.json())
    .then(data => setResults(data))
    .catch(error => console.error('Fetch Error', error));

  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <ul>
        {results.map((game) => (
          <li key={game.id}>{game.name}</li> 
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
