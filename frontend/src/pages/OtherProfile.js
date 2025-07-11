import React, { useEffect, useState } from 'react'
import { useParams }                from 'react-router-dom'
import NavBar                       from '../components/NavBar'
import placeholder                  from '../assets/images/placeholder.png'
import FollowButton                 from '../components/FollowButton'
import FollowersCount               from '../components/FollowersCount'
import FollowingCount               from '../components/FollowingCount'

export default function OtherProfile() {
  const { username } = useParams()
  const [profile, setProfile]           = useState(null)
  const [favoriteGames, setFavoriteGames] = useState([])
  const [error, setError]               = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    fetch(`http://localhost:8000/api/profile/${username}/`, {
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => setProfile(data))
      .catch(err => setError(err.toString()))
  }, [username])

  useEffect(() => {
    if (!profile?.favorite_games?.length) return
    Promise.all(
      profile.favorite_games.map(gid =>
        fetch(`http://localhost:8000/api/search-by-id/?id=${gid}`)
          .then(r => r.ok ? r.json() : [])
          .then(arr => arr[0] || null)
          .catch(() => null)
      )
    ).then(games => setFavoriteGames(games.filter(Boolean)))
  }, [profile])

  if (error)
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-[#e0e0e0] p-4">
        <p className="text-center text-[#ff6b6b]">{error}</p>
      </div>
    )
  if (!profile)
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-[#e0e0e0] p-4">
        <p className="text-center">Loading…</p>
      </div>
    )

  return (
    <div className="bg-[#1e1e1e] min-h-screen text-[#e0e0e0]">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center space-x-6">
          <img
            src={profile.avatar ? `http://localhost:8000${profile.avatar}` : placeholder}
            alt={`${profile.username}'s avatar`}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#444]"
          />
          <h1 className="text-3xl font-bold">{profile.username}</h1>
          <FollowButton targetUserId={profile.id} />
          <div className="flex space-x-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold">{profile.review_count}</span>
              <span className="text-sm">Games</span>
            </div>
            <div className="flex flex-col items-center">
              <FollowersCount username={profile.username} />
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <FollowingCount username={profile.username} />
              <span className="text-sm">Following</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Favorite Games */}
          <div>
            <h4 className="text-xl font-semibold border-b border-[#444] pb-1 mb-4">
              Favorite Games
            </h4>
            {favoriteGames.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {favoriteGames.map(game => (
                  <div key={game.id} className="rounded overflow-hidden shadow-lg">
                    <img
                      src={
                        game.cover?.url
                          ? `https:${game.cover.url.replace('t_thumb','t_cover_big')}`
                          : placeholder
                      }
                      alt={game.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No favorites yet.</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xl font-semibold border-b border-[#444] pb-1 mb-4">
              About Me
            </h4>
            <p className="leading-relaxed">
              {profile.bio || 'No bio provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
