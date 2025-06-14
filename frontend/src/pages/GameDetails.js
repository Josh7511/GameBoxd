import { useNavigate, useParams } from 'react-router-dom';
import GameLogForm from '../components/GameLogForm';
import GameCover from '../components/GameCover';
import GameSummary from '../components/GameSummary';
import GameReviews from '../components/GameReviews';
import './GameDetails.css';
import NavBar from '../components/NavBar';
import GameTitle from '../components/GameTitle';

function GameDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const navDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <NavBar />
      <div className="game-details-container">
        <div className="game-main-layout">
            <div className="game-cover-sticky">
            <GameCover />
            </div>

            <div className="game-center-column">
            <GameSummary />
            </div>
            <div className="game-reviews-right">
                <div className="game-log">
                <GameLogForm />
                </div>
                <div className="game-reviews">
                <GameReviews />
                </div>
            </div>
        </div>
    </div>
    </>
  );
  
}

export default GameDetails;
