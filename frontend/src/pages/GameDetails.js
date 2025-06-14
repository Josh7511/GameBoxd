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
        <h2>
          <GameTitle />
        </h2>
  
        <div className="game-main-row">
          <div className="game-cover-column">
            <GameCover />
          </div>
          <GameSummary />
          <GameLogForm />
        </div>
        <div className="game-reviews-row">
        <GameReviews />
        </div>
      </div>
    </>
  );
  
}

export default GameDetails;
