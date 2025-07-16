// src/components/GameThemes.jsx
import React, { useEffect, useState } from 'react'
import { useParams }                  from 'react-router-dom'

export default function GameThemes() {
  const { id } = useParams()
  const [game, setGame] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText)
        return r.json()
      })
      .then(data => setGame(data[0] || {}))
      .catch(err => console.error('Fetch Error', err))
  }, [id])

  if (!game?.themes) return null

  return (
    <div className="flex flex-wrap gap-2">
      {game.themes.map(theme => (
        <span
          key={theme.id}
          className="
            bg-card text-text 
            px-3 py-1 
            rounded-full 
            text-sm 
            capitalize 
            transition 
            hover:bg-accent-hover 
            hover:text-background
          "
        >
          {theme.name}
        </span>
      ))}
    </div>
  )
}
