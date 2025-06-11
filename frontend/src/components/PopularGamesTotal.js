import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../assets/images/placeholder.png';
import './PopularGames.css';

function PopularGamesTotal() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/popular-games-total/')
      .then((res) => res.json())
      .then((data) => setGames(data.slice(0, 6)))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
<div className="popular-wrapper">
  <div className="popular-row">
    <h2 className="popular-title">Most Played Games</h2>
  </div>
  <div className="popular-row popular-games-container">
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
</div>

  );
}

export default PopularGamesTotal;
