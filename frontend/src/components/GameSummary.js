// src/components/GameSummary.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function GameSummary() {
  const { id } = useParams()
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error('Fetch Error', err))
  }, [id])

  if (results.length === 0) {
    return (
      <p className="text-text text-lg leading-relaxed">
        No summary available for this game.
      </p>
    )
  }

  return (
    <div className="max-w-full text-text text-lg leading-relaxed break-words">
      {results.map(game => (
        <p key={game.id} className="mb-4">
          {game.summary}
        </p>
      ))}
    </div>
  )
}
