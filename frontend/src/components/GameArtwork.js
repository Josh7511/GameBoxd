import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from '../assets/images/placeholder.png';
import "./GameArtwork.css";


function GameArtwork() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data[0] || null);
      })
      .catch((err) => console.error('Fetch Error', err));
  }, [id]);

  const artworkUrl =
    game?.artworks?.[0]?.url?.replace('t_thumb', 't_1080p') || null;

  return (
    <div className="game-artwork">
      <img
        src={artworkUrl ? `https:${artworkUrl}` : placeholder}
        alt={game?.name || 'Game Artwork'}
        className="game-artwork-image"
      />
    </div>
  );
}

export default GameArtwork;
