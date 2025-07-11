// src/pages/Register.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail]       = useState('')
  const [error, setError]       = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8000/api/register/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, password, email })
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      localStorage.setItem('access_token',  data.access)
      localStorage.setItem('refresh_token', data.refresh)
      setError('')
      navigate('/dashboard')
    } catch {
      setError('Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2a2a2a] w-full max-w-sm p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#8f5ed3] text-center">
          Register
        </h2>

        {error && (
          <p className="text-center text-[#ff6b6b]">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-[#333] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#8f5ed3] text-[#e0e0e0]"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-[#333] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#8f5ed3] text-[#e0e0e0]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-[#333] border border-[#444] rounded focus:outline-none focus:ring-2 focus:ring-[#8f5ed3] text-[#e0e0e0]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#8f5ed3] rounded font-semibold text-[#1e1e1e] hover:bg-[#7d4fc4] transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}
