import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../assets/images/placeholder.png';
import './PopularGames.css';

function PopularGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/popular-games/')
      .then((res) => res.json())
      .then((data) => setGames(data.slice(0, 6)))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="popular-games-container">
    {games.map((game) => (
      <Link
        key={game.id}
        to={`/gamepage/${game.id}`}
        className="game-card"
      >
        <img
          src={
            game.cover?.url
              ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
              : placeholder
          }
          alt={game.name}
          className="game-cover"
        />
      </Link>
    ))}
  </div>
);
}

export default PopularGames;
