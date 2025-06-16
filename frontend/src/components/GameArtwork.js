import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import placeholder from '../assets/images/placeholder.png';

function GameArtwork(){
    const { id } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/fetch-game-artwork/?id=${id}`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error('Fetch Error', error));
    }, [id]);

    return (
        <div className="game-artwork">
        {results.length === 0 ? (
          <img src={placeholder} alt="Placeholder" className="game-artwork-image" />
        ) : (
          results.map((game) => (
            <div key={game.id}>
              <img
                src={
                  game.cover?.url
                    ? `https:${game.artwork.url.replace('t_thumb', 't_cover_big')}`
                    : placeholder
                }
                alt={game.name || 'Game Artwork'}
                className="game-artwork-image"
              />
            </div>
          ))
        )}
      </div>
    );
}
export default GameArtwork;