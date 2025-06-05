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
      <h2>Log a Game</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">Select status</option>
            <option value="playlist">Playlist</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
  
        <label>
          Rating (1–5):
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
          />
        </label>
  
        <label>
          Review:
          <textarea
            name="review"
            value={form.review}
            onChange={handleChange}
          />
        </label>
  
        <button type="submit">Submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
  
}

export default GameLogForm;

