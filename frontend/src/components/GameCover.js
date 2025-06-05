import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function GameCover() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/cover/?id=${id}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error('Fetch Error', error));
  }, [id]);

  return (
    <div className="game-cover">
      {results.map((game) => (
        <div key={game.id}>
          {game.cover?.url ? (
            <img src={`https:${game.cover.url.replace('t_thumb', 't_cover_big')}`}
            alt={game.name} />
          ) : (
            <p>No cover found</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default GameCover;
