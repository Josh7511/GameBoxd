import { useState } from 'react';
import { useParams } from 'react-router-dom';

function GameReviews() {


    fetch('http://localhost:8000/api/games-log/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => res.json())
      .then(data => console.log(data));
      
return(
    <div className="game-reviews">
        <h2>Game Reviews</h2>
        <p>Check the console for fetched reviews.</p>
    </div>
);
}

export default GameReviews;