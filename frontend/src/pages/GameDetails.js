import { useNavigate, useParams } from 'react-router-dom';
import GameLogForm from '../components/GameLogForm';
import GameCover from '../components/GameCover';
import GameSummary from '../components/GameSummary';
import GameReviews from '../components/GameReviews';
import './GameDetails.css';
import NavBar from '../components/NavBar';

function GameDetails(){
    const navigate = useNavigate();
    const { id } = useParams();


    const navDashboard = () => {
        navigate('/dashboard');
    };



    return (
        <>
            <NavBar />
        <div className="game-details-container">
            <h2>Game Details {id}</h2>
            <div className="game-details">
            <GameCover/>
            <GameSummary />
            </div>
            <GameLogForm />
            <GameReviews />
            <button onClick={navDashboard}>Back to Dashboard</button>
            </div>
            </>
    )
}

export default GameDetails;