import { useNavigate } from 'react-router-dom';
import GameLogForm from '../components/GameLogForm';

function GameDetails(){
    const navigate = useNavigate();

    const navDashboard = () => {
        navigate('/dashboard');
    };



    return (
        <div className="game-details-container">
            <h2>Game Details</h2>
            <p>Here you can display detailed information about the game.</p>
            <GameLogForm />
            <button onClick={navDashboard}>Back to Dashboard</button>
            </div>
    )
}

export default GameDetails;