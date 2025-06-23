import React, { useState, useEffect } from 'react';
import { useNavigate }        from 'react-router-dom';
import NavBar                 from '../components/NavBar';
import placeholderAvatar      from '../assets/images/placeholder-avatar.png';
import './EditProfile.css';

function EditProfile() {
  const [form, setForm]       = useState({
    email: '',
    bio: '',
    favorite_games: ''
  });
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
          email: data.email || '',
          bio: data.bio || '',
          favorite_games: data.favorite_games.join(',') // comma list
        });
        setPreview(data.avatar ? `http://localhost:8000${data.avatar}` : null);
      })
      .catch(err => setError('Failed to load profile'));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFile  = e => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('access_token');
    let body, headers;

    if (avatarFile) {
      body = new FormData();
      body.append('email', form.email);
      body.append('bio', form.bio);
      body.append('favorite_games', JSON.stringify(
        form.favorite_games.split(',').map(s => s.trim()).filter(Boolean)
      ));
      body.append('avatar', avatarFile);
      headers = { 'Authorization': `Bearer ${token}` };
    } else {
      body = JSON.stringify({
        email: form.email,
        bio: form.bio,
        favorite_games: form.favorite_games
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
      });
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }

    const res = await fetch('http://localhost:8000/api/profile/edit/', {
      method: 'PATCH',
      headers,
      body
    });

    if (res.ok) {
      navigate('/profile');
    } else {
      const err = await res.json();
      setError(Object.values(err).flat().join(' '));
    }
  };

  return (
    <>
      <NavBar />
      <div className="edit-profile-page">
        <h1>Edit Profile</h1>
        {error && <p className="error">{error}</p>}

        <form className="edit-form" onSubmit={handleSubmit}>
          <label>
            Avatar
            <div className="avatar-preview">
              <img
                src={preview || placeholderAvatar}
                alt="Avatar preview"
              />
            </div>
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Bio
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
          </label>

          <label>
            Favorite Games (IDs, comma-separated)
            <input
              type="text"
              name="favorite_games"
              value={form.favorite_games}
              onChange={handleChange}
              placeholder="e.g. 123, 456, 789"
            />
          </label>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;