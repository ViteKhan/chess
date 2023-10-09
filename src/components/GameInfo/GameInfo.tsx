import { useChessContext } from '../../hooks';
import { Timer } from '../Timer';
import './GameInfo.scss';

export const GameInfo = () => {
  const { currentPlayer } = useChessContext();

  return (
    <div className="gameInfo">
      <h2>Current player is {currentPlayer.color}</h2>
      <Timer currentPlayer={currentPlayer}/>
    </div>
  );
};