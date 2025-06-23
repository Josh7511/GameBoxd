import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import placeholder from '../assets/images/placeholder.png';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError]     = useState(null);
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

  if (error)   return <div className="profile-page"><p className="error">{error}</p></div>;
  if (!profile) return <div className="profile-page"><p>Loading...</p></div>;

  return (
    <>
      <NavBar />
      <div className="profile-page">
        <div className="profile-card">
          <img
            src={
              profile.avatar
                ? `http://localhost:8000${profile.avatar}`
                : placeholder
            }
            alt="Avatar"
            className="profile-avatar"
          />
          <h1 className="profile-username">{profile.username}</h1>
          <p className="profile-email">{profile.email}</p>

          <p className="profile-bio">
            {profile.bio || 'No bio provided.'}
          </p>

          <h2>Favorite Games</h2>
          {profile.favorite_games.length > 0 ? (
            <ul className="favorites-list">
              {profile.favorite_games.map((gid) => (
                <li key={gid}>Game ID: {gid}</li>
              ))}
            </ul>
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>
        <button className="edit-profile-button" onClick={editProfile}>Edit Profile</button>
      </div>
    </>
  );
}

export default Profile;
