import { useNavigate, useParams } from 'react-router-dom';
import GameLogForm from '../components/GameLogForm';
import GameCover from '../components/GameCover';

function GameDetails(){
    const navigate = useNavigate();
    const { id } = useParams();


    const navDashboard = () => {
        navigate('/dashboard');
    };



    return (
        <div className="game-details-container">
            <h2>Game Details {id}</h2>
            <p>Here you can display detailed information about the game.</p>
            <GameCover/>
            <GameLogForm />
            <button onClick={navDashboard}>Back to Dashboard</button>
            </div>
    )
}

export default GameDetails;