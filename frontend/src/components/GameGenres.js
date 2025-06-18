import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GameGenres.css';

function GameGenres() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data) => {
        setGame(data[0] || {});
      })
      .catch((err) => console.error('Fetch Error', err));
  }, [id]);

  if (!game || !game.genres) return null;

  return (
    <div className="game-genres">
      {game.genres.map((g) => (
        <span key={g.id} className="genre-badge">
          {g.name}
        </span>
      ))}
    </div>
  );
}

export default GameGenres;
