import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PopularGames() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/popular-games/')
      .then(res => res.json())
      .then(data => setGames(data.slice(0, 6)))
      .catch(err => console.error('Fetch error:', err))
  }, [])

  return (
    <div className="mx-auto my-8 w-fit flex flex-col">
      <h2 className="text-2xl text-accent border-b border-text mb-4 pl-8">
        Trending Games
      </h2>
      <div className="flex flex-wrap justify-center gap-6 p-8">
        {games.map(game => (
          <Link
            key={game.id}
            to={`/gamepage/${game.id}`}
            className="transform transition-transform hover:scale-105"
          >
            <img
              src={
                game.cover?.url
                  ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
                  : require('../assets/images/placeholder.png')
              }
              alt={game.name}
              className="w-36 rounded-xl shadow-lg"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
