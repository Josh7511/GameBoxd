import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import placeholder from '../assets/images/placeholder.png';
import './GameCover.css';

function GameCover() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error('Fetch Error', error));
  }, [id]);

  return (
    <div className="game-cover">
      {results.length === 0 ? (
        <img src={placeholder} alt="Placeholder" className="game-cover-image" />
      ) : (
        results.map((game) => (
          <div key={game.id}>
            <img
              src={
                game.cover?.url
                  ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
                  : placeholder
              }
              alt={game.name || 'Game Cover'}
              className="game-cover-image"
            />
          </div>
        ))
      )}
    </div>
  );
}

export default GameCover;
