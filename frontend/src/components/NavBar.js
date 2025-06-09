import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NavBar.css';

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
      <div className="nav-left">
        <Link to="/dashboard" className="logo">GameBoxd</Link>
      </div>
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
