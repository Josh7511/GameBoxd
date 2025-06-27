import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import placeholderAvatar from '../assets/images/placeholder-avatar.png';
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


  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
        {halfStar && <span className="star">½</span>}
      </>
    );
  };

  return (
    <div className="reviews-container">
      {results.map((log) => {
        const date = new Date(log.date_played).toLocaleDateString();
        return (
          <div className="review-box" key={log.id}>
            <div className="review-header">
            <img
              src={log.user_avatar || placeholderAvatar}
              alt={`${log.user}'s avatar`}
              className="review-avatar"
            />
              <div className="review-meta">
                <p className="review-by">
                  Review by <strong>{log.user}</strong>
                </p>
                <div className="review-rating">
                  {renderStars(log.rating)}
                </div>
              </div>
            </div>

            <p className="review-text">{log.review}</p>

            <div className="review-footer">
              <span className="review-date">{date}</span>
              <button className="like-button">♥ Like review</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GameReviews;
