import React, { useState, useEffect } from 'react'
import { useSearchParams, Link }     from 'react-router-dom'
import NavBar                         from '../components/NavBar'
import placeholderGame                from '../assets/images/placeholder.png'
import placeholderAvatar              from '../assets/images/placeholder-avatar.png'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query           = searchParams.get('query') || ''
  const [mode,   setMode]    = useState('games')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) return
    const base     = 'http://localhost:8000'
    const endpoint =
      mode === 'games'
        ? `${base}/api/search-igdb/?query=${encodeURIComponent(query)}`
        : `${base}/api/search-users/?query=${encodeURIComponent(query)}`

    fetch(endpoint)
      .then(r => r.json())
      .then(data => setResults(data))
      .catch(() => setResults([]))
  }, [mode, query])

  return (
    <>
      <NavBar />

      <div className="max-w-4xl mx-auto my-8 px-4">
        <div className="flex space-x-4 mb-4 text-text">
          <button
            onClick={() => setMode('games')}
            className={
              mode === 'games'
                ? 'border-b-2 border-accent text-accent font-bold pb-1'
                : 'border-b-2 border-transparent text-text font-bold pb-1'
            }
          >Games</button>
          <button
            onClick={() => setMode('users')}
            className={
              mode === 'users'
                ? 'border-b-2 border-accent text-accent font-bold pb-1'
                : 'border-b-2 border-transparent text-text font-bold pb-1'
            }
          >Users</button>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-text">
          {mode === 'games' ? 'Game' : 'User'} Results for “{query}”
        </h2>

        <ul className="space-y-4">
          {results.map(item => (
            <li
              key={item.id}
              className="flex gap-4 bg-card p-4 rounded-lg items-start"
            >
              {mode === 'games' ? (
                <>
                  <img
                    className="w-16 h-16 object-cover rounded"
                    src={
                      item.cover?.url
                        ? `https:${item.cover.url.replace('t_thumb','t_cover_small')}`
                        : placeholderGame
                    }
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <Link
                      to={`/gamepage/${item.id}`}
                      className="block text-accent text-lg font-bold hover:underline mb-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm line-clamp-3 text-text">
                      {item.summary || 'No description.'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img
                    className="w-16 h-16 object-cover rounded-full"
                    src={
                      item.avatar
                        ? `http://localhost:8000${item.avatar}`
                        : placeholderAvatar
                    }
                    alt={item.username}
                  />
                  <div className="flex-1">
                    <Link
                      to={`/profile/${item.username}`}
                      className="block text-accent text-lg font-bold hover:underline mb-1"
                    >
                      {item.username}
                    </Link>
                    <p className="text-sm line-clamp-3 text-text">
                      {item.bio || 'No bio available.'}
                    </p>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
