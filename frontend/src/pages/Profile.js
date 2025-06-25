import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import placeholder from '../assets/images/placeholder.png';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const editProfile = () => navigate('/edit-profile');

  // 1) fetch the user profile
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Not logged in');
      return;
    }

    fetch('http://localhost:8000/api/profile/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(err => setError(err.message));
  }, []);

  // 2) once we have profile.favorite_games, fetch each game’s info
  useEffect(() => {
    if (!profile?.favorite_games?.length) return;

    Promise.all(
      profile.favorite_games.map((gid) =>
        fetch(`http://localhost:8000/api/search-by-id/?id=${gid}`)
          .then(res => (res.ok ? res.json() : []))
          .then(arr => arr[0] || null)
          .catch(() => null)
      )
    ).then(games => {
      setFavoriteGames(games.filter(Boolean));
    });
  }, [profile]);

  if (error)    return <div className="profile-page"><p className="error">{error}</p></div>;
  if (!profile) return <div className="profile-page"><p>Loading...</p></div>;

  return (
    <>
      <NavBar />
      <div className="profile-page">
        <div className="profile-card">
          <img
            src={profile.avatar || placeholder}
            alt="Avatar"
            className="profile-avatar"
          />
          <h1 className="profile-username">{profile.username}</h1>
          <p className="profile-email">{profile.email}</p>
          <p className="profile-bio">
            {profile.bio || 'No bio provided.'}
          </p>

          <button
            className="edit-profile-button"
            onClick={editProfile}
          >
            Edit Profile
          </button>

          <h2>Favorite Games</h2>
          {favoriteGames.length > 0 ? (
            <div className="favorites-grid">
              {favoriteGames.map((game) => (
                <div className="favorite-game-card" key={game.id}>
                  <img
                    src={
                      game.cover?.url
                        ? `https:${game.cover.url.replace('t_thumb', 't_cover_small')}`
                        : placeholder
                    }
                    alt={game.name || 'Game Cover'}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
