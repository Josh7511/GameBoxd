// src/pages/SearchResults.js
import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import placeholderGame from '../assets/images/placeholder.png'
import placeholderAvatar from '../assets/images/placeholder-avatar.png'
import './SearchResults.css'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const [mode, setMode] = useState('games') 
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) return
    const endpoint =
      mode === 'games'
        ? `http://localhost:8000/api/search-igdb/?query=${encodeURIComponent(query)}`
        : `http://localhost:8000/api/search-users/?query=${encodeURIComponent(query)}`

    fetch(endpoint)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => {
        console.error('Fetch Error:', err)
        setResults([])
      })
  }, [mode, query])

  return (
    <>
      <NavBar />

      <div className="search-results-container">
        <div className="mode-toggle">
          <button
            className={mode === 'games' ? 'active' : ''}
            onClick={() => setMode('games')}
          >Games</button>
          <button
            className={mode === 'users' ? 'active' : ''}
            onClick={() => setMode('users')}
          >Users</button>
        </div>

        <h2>
          {mode === 'games' ? 'Game' : 'User'} Results for “{query}”
        </h2>

        <ul className="results-list">
          {results.map(item => (
            <li key={item.id} className="result-item">
              {mode === 'games' ? (
                <>
                  <img
                    className="thumb"
                    src={
                      item.cover?.url
                        ? `https:${item.cover.url.replace('t_thumb','t_cover_small')}`
                        : placeholderGame
                    }
                    alt={item.name}
                  />
                  <div className="details">
                    <Link to={`/gamepage/${item.id}`} className="title">
                      {item.name}
                    </Link>
                    <p className="desc">
                      {item.summary || 'No description.'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img
                    className="thumb avatar"
                    src={
                      item.avatar
                        ? `http://localhost:8000${item.avatar}`
                        : placeholderAvatar
                    }
                    alt={item.username}
                  />
                  <div className="details">
                    <Link to={`/profile/${item.username}`} className="title">
                      {item.username}
                    </Link>
                    <p className="desc">
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
