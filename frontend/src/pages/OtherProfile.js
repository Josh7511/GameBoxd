import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import placeholder from '../assets/images/placeholder.png'
import FollowButton from '../components/FollowButton'
import FollowersCount from '../components/FollowersCount'
import './Profile.css'


export default function OtherProfile() {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [favoriteGames, setFavoriteGames] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    fetch(`http://localhost:8000/api/profile/${username}/`, {
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json()
      })
      .then(data => setProfile(data))
      .catch(err => setError(err.message))
  }, [username])

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

  if (error)    return <div className="profile-page"><p className="error">{error}</p></div>
  if (!profile) return <div className="profile-page"><p>Loading…</p></div>

  return (
    <>
      <NavBar />
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={profile.avatar ? `http://localhost:8000${profile.avatar}` : placeholder}
              alt={`${profile.username}'s avatar`}
              className="profile-avatar"
            />
            <h1 className="profile-username">{profile.username}</h1>
            <FollowButton targetUserId={profile.id} />
            <h4 className="game-review-statistic">
              <span className="game-review-count">{profile.review_count}</span>
              <span className="game-review-count-label">Games</span>
            </h4>
            <h4 className="followers-count-statistic">
              <FollowersCount username={profile.username} />
              <span className="followers-count-label">Followers</span>
            </h4>
          </div>
          <div className="profile-bio-and-games">
            <div className="games-column">
              <h4>Favorite Games</h4>
              {favoriteGames.length > 0 ? (
                <div className="favorites-grid">
                  {favoriteGames.map(game => (
                    <div className="favorite-game-card" key={game.id}>
                      <img
                        src={
                          game.cover?.url
                            ? `https:${game.cover.url.replace('t_thumb','t_cover_big')}`
                            : placeholder
                        }
                        alt={game.name}
                        className="favorite-game-image"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No favorites yet.</p>
              )}
            </div>
            <div className="bio-column">
              <h4>About Me</h4>
              <p className="profile-bio">
                {profile.bio || 'No bio provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
