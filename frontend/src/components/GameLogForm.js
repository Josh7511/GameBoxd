import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function GameLogForm() {
  const { id } = useParams()
  const [form, setForm] = useState({
    game_id: id,
    status: '',
    rating: '',
    review: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('access_token')
      const res = await fetch('http://localhost:8000/api/games-log/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMessage('Game log submitted!')
        setForm({ game_id: id, status: '', rating: '', review: '' })
      } else {
        const err = await res.json()
        setMessage(`Failed to submit: ${err.detail || 'Unknown error'}`)
      }
    } catch {
      setMessage('Error submitting.')
    }
  }

  return (
    <div className="bg-card text-text p-8 rounded-xl shadow-lg max-w-xs h-[550px] mx-auto font-sans flex flex-col">
      <h2 className="text-center text-xl font-bold text-accent mb-2">Log This Game</h2>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="block mb-1 font-semibold">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full p-3 bg-input-bg border border-input-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            >
              <option value="">Select status</option>
              <option value="playlist">Playlist</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="rating" className="block mb-1 font-semibold">
              Rating (1 – 5)
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.5"
              value={form.rating}
              onChange={handleChange}
              required
              className="w-full p-3 bg-input-bg border border-input-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="review" className="block mb-1 font-semibold">
              Review
            </label>
            <textarea
              name="review"
              rows="5"
              placeholder="Share your thoughts..."
              value={form.review}
              onChange={handleChange}
              className="w-full p-3 bg-input-bg border border-input-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-accent text-text font-bold rounded-md hover:bg-accent-hover transition"
        >
          Submit Log
        </button>
      </form>
      {message && <p className="mt-4 text-center text-accent">{message}</p>}
    </div>
  )
}
