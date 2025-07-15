import React, { useState, useEffect } from 'react'
import { useParams }                from 'react-router-dom'
import placeholder                   from '../assets/images/placeholder.png'

export default function GameArtwork() {
  const { id } = useParams()
  const [game, setGame] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then(r => r.json())
      .then(data => setGame(data[0] || null))
      .catch(() => {})
  }, [id])

  const artworkUrl =
    game?.artworks?.[0]?.url?.replace('t_thumb', 't_1080p') || null

  return (
    <div className="relative flex justify-center bg-background overflow-hidden">
      <img
        src={artworkUrl ? `https:${artworkUrl}` : placeholder}
        alt={game?.name || 'Game Artwork'}
        className={
          `w-[1200px] max-h-[450px] rounded-lg ` +
          `shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out ` +
          `[mask-image:linear-gradient(to_right,transparent_0%,black_0%,black_90%,transparent_100%)] ` +
          `[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] ` +
          `mask-no-repeat`
        }
      />
    </div>
  )
}
