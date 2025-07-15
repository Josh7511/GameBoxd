import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import placeholder from '../assets/images/placeholder.png'

export default function GameCover() {
  const { id } = useParams()
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then(r => r.json())
      .then(data => setResults(data))
      .catch(() => {})
  }, [id])

  return (
    <div className="flex justify-center">
      {results.length === 0
        ? <img
            src={placeholder}
            alt="Placeholder"
            className="w-[230px] object-cover rounded-lg"
          />
        : results.map(game => (
            <img
              key={game.id}
              src={
                game.cover?.url
                  ? `https:${game.cover.url.replace('t_thumb','t_cover_big')}`
                  : placeholder
              }
              alt={game.name || 'Game Cover'}
              className="w-[230px] object-cover rounded-lg"
            />
          ))
      }
    </div>
  )
}
