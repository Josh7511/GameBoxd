import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import './NavBar.css';
import controller from '../assets/images/controller.png';
import placeholder from '../assets/images/placeholder.png';

function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

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

  return (
    <nav className="navbar">
   
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0rem' }}>
                <img src={controller} alt="Controller Icon" style={{ width: '60px', height: 'auto' }} />
                <h2 style={{ margin: 0, color: 'var(--accent)' }}>Gameboxd</h2>
            </div>
        </Link>
      <div className="nav-center">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            placeholder="Search games..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="nav-right">
      <Link to="/about" className="about-me">About Me</Link>
      <Link to="/profile" className="nav-link">
        <img
            src={ profile.avatar || placeholder }
            alt="Avatar"
            className="profile-link"
         />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
