import React, { useState } from 'react'
import { useNavigate }      from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8000/api/token/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      localStorage.setItem('access_token',  data.access)
      localStorage.setItem('refresh_token', data.refresh)
      setError('')
      navigate('/dashboard')
    } catch {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card w-full max-w-sm p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl text-center font-bold text-accent">
          Login
        </h2>
        {error && (
          <p className="text-center text-error">{error}</p>
        )}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-input-bg border border-input-border rounded focus:outline-none focus:ring-2 focus:ring-accent text-text"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-input-bg border border-input-border rounded focus:outline-none focus:ring-2 focus:ring-accent text-text"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-accent rounded font-semibold text-background hover:bg-accent-hover transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}
