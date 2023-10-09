import { useChessContext, useTimer } from 'hooks';
import { Modal } from '../Modal';
import { Timer } from '../Timer';
import './GameInfo.scss';

export const GameInfo = () => {
  const { currentPlayer } = useChessContext();
  const { blackTime, whiteTime, onRestartGame, confirmRestartGame } = useTimer();

  return (
    <div className="gameInfo">
      <h2>Current player is {currentPlayer.color}</h2>
      <Timer
        currentPlayer={currentPlayer}
        blackTime={blackTime}
        whiteTime={whiteTime}
        onRestartGame={confirmRestartGame}
      />
      <Modal blackTime={blackTime} whiteTime={whiteTime} onRestartGame={onRestartGame}/>
    </div>
  );
};