import { useNavigate, useParams } from 'react-router-dom';
import GameLogForm from '../components/GameLogForm';
import GameCover from '../components/GameCover';
import GameSummary from '../components/GameSummary';

function GameDetails(){
    const navigate = useNavigate();
    const { id } = useParams();


    const navDashboard = () => {
        navigate('/dashboard');
    };



    return (
        <div className="game-details-container">
            <h2>Game Details {id}</h2>
            <GameCover/>
            <GameSummary />
            <GameLogForm />
            <button onClick={navDashboard}>Back to Dashboard</button>
            </div>
    )
}

export default GameDetails;