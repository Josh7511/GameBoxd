import {useState, useEffect} from 'react';

function GameLogForm(){

  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    game: '',
    status: '',
    rating: '',
    review: '',
  });

  useEffect(() => {
    fetch('/api/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching games:', error));
  }, []);


  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/games-log/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setMessage("Game log submitted!");
        setForm({ game: '', status: '', rating: '', review: '' });
      } else {
        setMessage("Failed to submit.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting.");
    }
  };
  return (
    <div className="game-log-form">
      <h2>Log a Game</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select name="game" value={form.game} onChange={handleChange} required>
          <option value="">Select a game</option>
          {games.map(game => (
            <option key={game.id} value={game.id}>{game.title}</option>
          ))}
        </select>

        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="">Select status</option>
          <option value="completed">Completed</option>
          <option value="inprogress">In Progress</option>
          <option value="playlist">Playlist</option>
        </select>

        <input
          type="number"
          name="rating"
          placeholder="Rating (1–5)"
          value={form.rating}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />

        <textarea
          name="review"
          placeholder="Write a review"
          value={form.review}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GameLogForm;

