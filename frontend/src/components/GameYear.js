
import React, { useState, useEffect } from 'react'
import { useParams }                  from 'react-router-dom'

export default function GameYear() {
  const { id } = useParams()
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then(r => r.json())
      .then(data => setResults(data))
      .catch(err => console.error('Fetch Error:', err))
  }, [id])

  const year =
    results.length && results[0].first_release_date
      ? new Date(results[0].first_release_date * 1000).getFullYear()
      : 'Unknown'

  return (
    <h2 className="mt-0 mb-[-2] font-serif text-2xl text-text">
      {year}
    </h2>
  )
}
