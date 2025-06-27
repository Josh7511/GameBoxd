// src/pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate }        from 'react-router-dom';
import NavBar                 from '../components/NavBar';
import placeholderAvatar      from '../assets/images/placeholder-avatar.png';
import placeholderCover       from '../assets/images/placeholder.png';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm]             = useState({ email: '', bio: '', favorite_games: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview]       = useState(null);
  const [error, setError]           = useState(null);

  const [favIds, setFavIds]             = useState(['', '', '', '']);
  const [favGamesData, setFavGamesData] = useState([{}, {}, {}, {}]);
  const [showModal, setShowModal]       = useState(false);
  const [editingSlot, setEditingSlot]   = useState(null);
  const [searchTerm, setSearchTerm]     = useState('');
  const [suggestions, setSuggestions]   = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://localhost:8000/api/profile/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => {
        const arr = (data.favorite_games || []).slice(0, 4);
        while (arr.length < 4) arr.push('');
        setFavIds(arr);

        setForm({
          email: data.email || '',
          bio: data.bio || '',
          favorite_games: JSON.stringify(arr.filter(Boolean))
        });
        setPreview(data.avatar ? `http://localhost:8000${data.avatar}` : null);
      })
      .catch(() => setError('Failed to load profile'));
  }, []);

 //fetch game details on id change
  useEffect(() => {
    favIds.forEach((id, idx) => {
      if (!id) {
        setFavGamesData(prev => {
          const copy = [...prev];
          copy[idx] = {};
          return copy;
        });
        return;
      }

      fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
        .then(r => r.json())
        .then(data => {
          if (data.length > 0) {
            const game = data[0];
            setFavGamesData(prev => {
              const copy = [...prev];
              copy[idx] = {
                id: game.id,
                name: game.name,
                coverUrl: game.cover
                  ? `https:${game.cover.url.replace('t_thumb','t_cover_big')}`
                  : null
              };
              return copy;
            });
          }
        });
    });
  }, [favIds]);

 //fetches the game suggestions based on search term
  useEffect(() => {
    if (!showModal || !searchTerm) {
      setSuggestions([]);
      return;
    }
    fetch(`http://localhost:8000/api/search-igdb/?query=${encodeURIComponent(searchTerm)}`)
      .then(r => r.json())
      .then(games => setSuggestions(games.slice(0, 5)))
      .catch(() => setSuggestions([]));
  }, [searchTerm, showModal]);

  const handleFile = e => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const openModal = idx => {
    setEditingSlot(idx);
    setSearchTerm('');
    setSuggestions([]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSlot(null);
    setSearchTerm('');
    setSuggestions([]);
  };

  const pickSuggestion = game => {
    const updated = [...favIds];
    updated[editingSlot] = game.id;
    setFavIds(updated);
    setForm(f => ({
      ...f,
      favorite_games: JSON.stringify(updated.filter(Boolean))
    }));
    closeModal();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('bio', form.bio);
    formData.append('favorite_games', form.favorite_games);
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
              <img src={preview || placeholderAvatar} alt="Avatar preview" />
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

          <div className="favorite-games-section">
            <h2>Favorite Games</h2>
            <div className="favorite-games-grid">
              {favGamesData.map((game, idx) => (
                <div key={idx} className="favorite-game-slot">
                  <img
                    src={game.coverUrl || placeholderCover}
                    alt={game.name || `Slot ${idx + 1}`}
                    className="favorite-game-thumb"
                    onClick={() => openModal(idx)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <input
              className="fav-search-input"
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
            />
            {suggestions.length > 0 && (
              <ul className="fav-dropdown">
                {suggestions.map(g => (
                  <li key={g.id} onClick={() => pickSuggestion(g)}>
                    <img
                      src={
                        g.cover
                          ? `https:${g.cover.url.replace('t_thumb','t_cover_small')}`
                          : placeholderCover
                      }
                      alt=""
                      className="fav-dropdown-thumb"
                    />
                    <span>{g.name}</span>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={closeModal} className="modal-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
