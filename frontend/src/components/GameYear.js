import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GameYear.css'; 

function GameYear() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error('Fetch Error:', error));
  }, [id]);

  const year = results.length && results[0].first_release_date
    ? new Date(results[0].first_release_date * 1000).getFullYear()
    : 'Unknown';

  return (
    <h2 className="game-year">
      {year}
    </h2>
  );
}

export default GameYear;