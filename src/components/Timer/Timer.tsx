import { FC } from 'react';
import { useTimer } from 'hooks';
import { Player } from 'models/Player';

interface TimerProps {
  currentPlayer: Player;
  restart: () => void;
}

export const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const { blackTime, whiteTime, onRestart } = useTimer(currentPlayer, restart);

  return (
    <div>
      <div>
        <button onClick={onRestart}>Restart game</button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  );
};