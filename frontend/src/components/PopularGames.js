import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../assets/images/placeholder.png';

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
      <h2>Popular Games</h2>
      <ul className="popular-games-list">
        {games.map((game) => (
          <li key={game.id} className="popular-game-card">
            <img
              src={
                game.cover?.url
                  ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
                  : placeholder
              }
              alt={game.name}
            />
            <Link to={`/gamepage/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularGames;
