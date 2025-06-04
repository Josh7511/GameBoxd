import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:8000/api/search-igdb/?query=${query}`)
    .then(response => response.json())
    .then(data => setResults(data))
    .catch(error => console.error('Fetch Error', error));

  }, [query]);

  const goBack = () => {
    navigate('/dashboard');
  };


  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <ul>
        {results.map((game) => (
          <li key={game.id}>
            <Link to={`/gamepage/${game.id}`}>{game.name}</Link>
          </li>
        ))}
        <button onClick={goBack}>Go Back</button>
      </ul>
    </div>
  );
}

export default SearchResults;
