import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function NavBar() {
  const [query, setQuery] = useState('')
  const [profile, setProfile] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return
    fetch('http://localhost:8000/api/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setProfile)
      .catch(() => {})
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?query=${query}`)
  }

  return (
    <nav className="flex items-center justify-between bg-card px-8 py-4 shadow-md text-text">
      <Link to="/dashboard" className="flex items-center">
        <img src={require('../assets/images/controller.png')} alt="Logo" className="w-12 h-auto" />
        <h2 className="text-2xl font-bold text-accent ml-2">Gameboxd</h2>
      </Link>

      <div className="flex flex-grow justify-center px-4">
        <form onSubmit={handleSearch} className="flex w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search games..."
            className="flex-grow px-3 py-2 bg-input-bg border border-input-border rounded-l focus:outline-none focus:ring-2 focus:ring-accent text-text"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-text rounded-r hover:bg-accent-hover transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/about" className="text-accent font-medium hover:text-secondary">
          About Me
        </Link>
        <Link to="/profile" className="block">
          <img
            src={profile.avatar ? `http://localhost:8000${profile.avatar}` : require('../assets/images/placeholder.png')}
            alt={`${profile.username}'s avatar`}
            className="w-10 h-10 rounded-full object-cover hover:border-2 hover:border-secondary hover:scale-105 transition"
          />
        </Link>
      </div>
    </nav>
  )
}
