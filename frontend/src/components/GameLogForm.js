import {useState } from 'react';
import { useParams } from 'react-router-dom';

import './GameLogForm.css';


function GameLogForm(){

  const { id } = useParams();
  const [form, setForm] = useState({
    game_id: id,
    status: '',
    rating: '',
    review: '',
  });

  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('access_token');
      
        const response = await fetch('http://localhost:8000/api/games-log/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(form)
        });

      if (response.ok) {
        setMessage("Game log submitted!");
        setForm({ status: '', rating: '', review: '' });
      } else {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        setMessage(`Failed to submit: ${errorData.detail || 'Unknown error'}`);
      }
      
    } catch (err) {
      console.error(err);
      setMessage("Error submitting.");
    }
  };
  return (
<div className="game-log-form">
  <h2>Log This Game</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="status">Status</label>
      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="">Select status</option>
        <option value="playlist">Playlist</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="rating">Rating (1–5)</label>
      <input
        type="number"
        name="rating"
        min="1"
        max="5"
        step="0.5"
        value={form.rating}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="review">Review</label>
      <textarea
        name="review"
        rows="5"
        placeholder="Share your thoughts..."
        value={form.review}
        onChange={handleChange}
      />
    </div>

    <button type="submit">Submit Log</button>
    {message && <p>{message}</p>}
  </form>
</div>

  );
  
}

export default GameLogForm;

