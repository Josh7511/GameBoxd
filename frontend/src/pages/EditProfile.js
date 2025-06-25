import React, { useState, useEffect } from 'react';
import { useNavigate }        from 'react-router-dom';
import NavBar                 from '../components/NavBar';
import placeholderAvatar      from '../assets/images/placeholder-avatar.png';
import placeholderCover       from '../assets/images/placeholder.png';  // <-- your cover placeholder
import './EditProfile.css';

function EditProfile() {
  const [form, setForm]       = useState({ email: '', bio: '', favorite_games: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview]       = useState(null);
  const [error, setError]           = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://localhost:8000/api/profile/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => {
        setForm({
          email: data.email,
          bio: data.bio,
          favorite_games: data.favorite_games.join(',')
        });
        setPreview(data.avatar ? `http://localhost:8000${data.avatar}` : null);
      })
      .catch(() => setError('Failed to load profile'));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleFile = e => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('bio', form.bio);
    formData.append(
      'favorite_games',
      JSON.stringify(
        form.favorite_games
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
      )
    );
    if (avatarFile) formData.append('avatar', avatarFile);

    const res = await fetch('http://localhost:8000/api/profile/edit/', {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      navigate('/profile');
    } else {
      const text = await res.text();
      let msg = text;
      if (res.headers.get('Content-Type')?.includes('application/json')) {
        const json = JSON.parse(text);
        msg = Object.values(json).flat().join(' ');
      }
      setError(`Error ${res.status}: ${msg}`);
    }
  };

  // helper to turn your comma-list into an array
  const favIds = form.favorite_games
    .split(',')
    .map(id => id.trim())
    .filter(Boolean);

  return (
    <>
      <NavBar />
      <div className="edit-profile-page">
        <h1>Edit Profile</h1>
        {error && <p className="error">{error}</p>}

        <form className="edit-form" onSubmit={handleSubmit}>
          {/* Avatar */}
          <label>
            Avatar
            <div className="avatar-preview">
              <img src={preview || placeholderAvatar} alt="Avatar preview" />
            </div>
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          {/* Email */}
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          {/* Bio */}
          <label>
            Bio
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
          </label>

          {/* Favorites as clickable placeholders */}
          <div className="favorite-games-section">
            <h2>Favorite Games</h2>
            <div className="favorite-games-grid">
              {favIds.map(gid => (
                <img
                  key={gid}
                  src={placeholderCover}
                  alt={`Fav game ${gid}`}
                  className="favorite-game-thumb"
                  onClick={() => alert(`Clicked game ${gid}`)}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
