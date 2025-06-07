import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GameReviews.css';

function GameReviews() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/game-log-by-id/?query=${id}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error('Fetch Error', error));
  }, [id]);


return(
<div className="reviews-container">
  {results.map((log) => (
    <div className="review-box" key={log.id}>
      <h2>Reviewed by: {log.user} </h2>
        <h3>Rating: {log.rating}/5</h3>
      <p>{log.review}</p>
      <p><small>{new Date(log.date_played).toLocaleDateString()}</small></p>
    </div>
  ))}
</div>

);
}

export default GameReviews;