import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  <div className="game-reviews">
  {results.length === 0 ? (
      <p>No summary available for this game.</p>
  ) : (
      results.map((log) => (
          <div key={log.user}>
              <p>{log.rating}</p>
              <p>{log.review}</p>
          </div>
      ))
  )}
</div>
);
}

export default GameReviews;