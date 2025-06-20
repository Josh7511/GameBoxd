import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import './SearchResults.css'; 
import placeholder from '../assets/images/placeholder.png';
import NavBar from '../components/NavBar'; 

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:8000/api/search-igdb/?query=${query}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error('Fetch Error', error));
  }, [query]);

  const goBack = () => navigate('/dashboard');

  return (
    <>
      <NavBar />
      <div className="search-results-grid">
        {/* ← Left column */}
        <div className="search-results-column">
          <h2>Search Results for "{query}"</h2>
          <ul className="results-list">
            {results.map((game) => (
              <li key={game.id} className="result-item">
                <img
                  src={
                    game.cover?.url
                      ? `https:${game.cover.url.replace('t_thumb', 't_cover_small')}`
                      : placeholder
                  }
                  alt={game.name || 'Game Cover'}
                  className="game-cover-thumb"
                />
                <div className="game-details">
                  <Link to={`/gamepage/${game.id}`} className="game-titles">
                    {game.name}
                  </Link>
                  <p className="game-description">
                    {game.summary || 'No description available.'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button className="back-button" onClick={goBack}>Go Back</button>
        </div>

        {}
        <div className="search-sidebar">
          <h3>Featured Widget</h3>
        </div>
      </div>
    </>
  );
}

export default SearchResults;
