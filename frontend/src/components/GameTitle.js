import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';


function GameTitle() {
    const { id } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/search-by-id/?id=${id}`)
            .then((response) => response.json())
            .then((data) => setResults(data))
            .catch((error) => console.error('Fetch Error', error));
    }, [id]);

    return (
        <div className="game-title">
            {results.length === 0 ? (
                <p>Title Not Loading.</p>
            ) : (
                results.map((game) => (
                    <div key={game.id}>
                        <p>{game.name}</p>
                    </div>
                ))
            )}
        </div>
    );



}

export default GameTitle;