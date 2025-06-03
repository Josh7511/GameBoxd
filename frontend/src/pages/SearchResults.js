import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`/api/search-igdb/?query=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error('Search failed:', err));
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <ul>
        {results.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
