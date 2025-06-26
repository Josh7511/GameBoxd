import { useNavigate, useParams } from 'react-router-dom';
import GameLogForm from '../components/GameLogForm';
import GameCover from '../components/GameCover';
import GameSummary from '../components/GameSummary';
import GameReviews from '../components/GameReviews';
import './GameDetails.css';
import NavBar from '../components/NavBar';
import GameTitle from '../components/GameTitle';
import GameArtwork from '../components/GameArtwork';
import GameGenres from '../components/GameGenres';
import GameYear from '../components/GameYear';
import GameThemes from '../components/GameThemes';

function GameDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const navDashboard = () => {
    navigate('/dashboard');
  };

  return (
<>
  <NavBar />
    <div className="game-artwork-container">
        <GameArtwork />
    </div>
  <div className="game-details-container">
    <div className="game-layout">
    <div className="game-cover-top">
      <div className="game-cover-column">
        <GameCover />
      </div>
    </div>
      <div className="game-main-content">
        <div className="top-row">
          <div className="game-info">
            <h1 className="game-title"><GameTitle/> </h1>
            <h3 className="game-year"><GameYear/></h3>
            <div className="game-summary"><GameSummary /></div>
            <h3 className="game-genres-title">Genres:</h3>
            <div className="game-genres"><GameGenres/></div>
            <h3 className="game-themes-title">Themes:</h3>
            <div className="game-themes"><GameThemes/></div>
          </div>
          <div className="game-log-form"><GameLogForm /></div>
        </div>
        <div className="game-reviews-title">
          <h4>
            Game Reviews:
          </h4>
        </div>
        <div className="game-reviews"><GameReviews /></div>
      </div>
    </div>
  </div>
</>

  );
  
}

export default GameDetails;
