import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import placeholderAvatar from '../assets/images/placeholder-avatar.png'
import FollowersCount from '../components/FollowersCount'
import FollowingCount from '../components/FollowingCount'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [favoriteGames, setFavoriteGames] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setError('Not logged in')
      return
    }
    fetch('http://localhost:8000/api/profile/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json()
      })
      .then(data => setProfile(data))
      .catch(err => setError(err.message))
  }, [])

  useEffect(() => {
    if (!profile?.favorite_games?.length) return
    Promise.all(
      profile.favorite_games.map(gid =>
        fetch(`http://localhost:8000/api/search-by-id/?id=${gid}`)
          .then(res => (res.ok ? res.json() : []))
          .then(arr => arr[0] || null)
          .catch(() => null)
      )
    ).then(games => setFavoriteGames(games.filter(Boolean)))
  }, [profile])

  if (error)
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <p className="text-[#ff6b6b]">{error}</p>
      </div>
    )
  if (!profile)
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <p className="text-[#e0e0e0]">Loading…</p>
      </div>
    )

  return (
    <div className="bg-[#1e1e1e] min-h-screen">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center space-x-6">
          <img
            src={
              profile.avatar
                ? (profile.avatar.startsWith('http')
                    ? profile.avatar
                    : `http://localhost:8000${profile.avatar}`)
                : placeholderAvatar
            }
            alt={`${profile.username}'s avatar`}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#444]"
          />
          <h1 className="text-3xl font-bold text-[#e0e0e0]">{profile.username}</h1>
          <button
            onClick={() => navigate('/edit-profile')}
            className="ml-4 px-4 py-2 bg-[#2a2a2a] text-[#e0e0e0] rounded hover:bg-[#57B9FF] transition"
          >
            Edit Profile
          </button>
          <div className="flex space-x-8 ml-auto">
            <div className="flex flex-col items-center text-[#e0e0e0]">
              <span className="text-2xl font-bold">{profile.review_count}</span>
              <span className="text-sm">Games</span>
            </div>
            <div className="flex flex-col items-center text-[#e0e0e0]">
              <FollowersCount username={profile.username} />
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center text-[#e0e0e0]">
              <FollowingCount username={profile.username} />
              <span className="text-sm">Following</span>
            </div>
          </div>
        </div>

        {/* Bio & Favorites */}
        <div className="flex gap-8">
          {/* Favorites */}
          <div className="w-3/5">
            <h2 className="text-xl font-semibold text-[#e0e0e0] border-b border-[#e0e0e0] mb-4">
              Favorite Games
            </h2>
            {favoriteGames.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {favoriteGames.map(game => (
                  <div
                    key={game.id}
                    className="bg-[#2a2a2a] rounded shadow overflow-hidden"
                  >
                    <img
                      src={
                        game.cover?.url
                          ? `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`
                          : placeholderAvatar
                      }
                      alt={game.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#e0e0e0]">No favorites yet.</p>
            )}
          </div>

          {/* Bio */}
          <div className="w-2/5">
            <h2 className="text-xl font-semibold text-[#e0e0e0] border-b border-[#e0e0e0] mb-4">
              About Me
            </h2>
            <p className="text-[#e0e0e0] leading-relaxed">
              {profile.bio || 'No bio provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
