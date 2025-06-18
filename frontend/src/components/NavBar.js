import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import './NavBar.css';
import controller from '../assets/images/controller.png';

function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <nav className="navbar">
   
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0rem' }}>
                <img src={controller} alt="Controller Icon" style={{ width: '60px', height: 'auto' }} />
                <h2 style={{ margin: 0, color: 'var(--accent)' }}>GameBoxd</h2>
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
      <Link to="/about" className="nav-link">About Us</Link>
      </div>
    </nav>
  );
}

export default NavBar;
