import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import placeholder from '../assets/images/placeholder.png';
import FollowersCount from '../components/FollowersCount';
import FollowingCount from '../components/FollowingCount';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const editProfile = () => navigate('/edit-profile');

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
          <div className="profile-header">
            <img
              src={profile.avatar || placeholder}
              alt="Avatar"
              className="profile-avatar"
            />
            <h1 className="profile-username">{profile.username}</h1>
            <button
              className="edit-profile-button"
              onClick={editProfile}
            >
              Edit Profile
            </button>
            <h4 className="game-review-statistic">
              <span className="game-review-count">
                {profile.review_count} 
                </span>
              <span className="game-review-count-label">
                Games
                </span>
            </h4>
            <h4 className="followers-count-statistic">
              <FollowersCount username={profile.username} />
              <span className="followers-count-label">Followers</span>
            </h4>
            <h4 className="following-count-statistic">
              <FollowingCount username={profile.username} />
              <span className="following-count-label">Following</span>
            </h4>
          </div>
          <div className="profile-bio-and-games">
            <div className="games-column">
              <h4>Favorite Games</h4>
              {favoriteGames.length > 0 ? (
                <div className="favorites-grid">
                  {favoriteGames.map((game) => (
                    <div className="favorite-game-card" key={game.id}>
                      <img
                        src={
                          game.cover?.url
                            ? `https:${game.cover.url.replace(
                                't_thumb',
                                't_cover_big'
                              )}`
                            : placeholder
                        }
                        alt={game.name || 'Game Cover'}
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
  );
}

export default Profile;
