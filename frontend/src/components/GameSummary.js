import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './GameSummary.css';

function GameSummary() {
    const { id } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
            .then((response) => response.json())
            .then((data) => setResults(data))
            .catch((error) => console.error('Fetch Error', error));
    }, [id]);

    return (
        <div className="game-summary">
            {results.length === 0 ? (
                <p>No summary available for this game.</p>
            ) : (
                results.map((game) => (
                    <div key={game.id}>
                        <p>{game.summary}</p>
                    </div>
                ))
            )}
        </div>
    );



}

export default GameSummary;