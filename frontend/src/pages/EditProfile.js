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

  // inside your handleSubmit in EditProfilePage.jsx

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
  
    formData.append('email',           form.email);
    formData.append('bio',             form.bio);
    formData.append(
      'favorite_games',
      JSON.stringify(
        form.favorite_games
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
      )
    );
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
  
    const res = await fetch('http://localhost:8000/api/profile/edit/', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        // **no** Content-Type here! let the browser set multipart boundaries
      },
      body: formData,
    });
  
    // Only attempt to parse JSON if the Content-Type is JSON
    const contentType = res.headers.get('Content-Type') || '';
    if (res.ok) {
      // success! profile updated
      navigate('/profile');
    } else {
      const text = await res.text();             // raw text
      let errMsg = text;
      if (contentType.includes('application/json')) {
        const json = JSON.parse(text);
        errMsg = Object.values(json).flat().join(' ');
      }
      setError(`Error ${res.status}: ${errMsg}`);
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