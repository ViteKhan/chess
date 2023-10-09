import { useTimer } from 'hooks';
import { Player } from 'models/Player';
import { FC } from 'react';
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { ReactComponent as RestartIcon } from '../../assets/icons/restart.svg';
import { COLORS } from 'types';
import './Timer.scss';

interface TimerProps {
  currentPlayer: Player;
}

export const Timer: FC<TimerProps> = ({ currentPlayer }) => {
  const { blackTime, whiteTime, onRestartGame } = useTimer();

  return (
    <div className="timer">
      <div className="text">
        <TimerIcon/>
        <h4>Remaining seconds:</h4>
      </div>
      <div className="text">
        <p>Black - {blackTime}</p>
        {currentPlayer.color === COLORS.BLACK && <ArrowIcon/>}
      </div>
      <div className="text">
        <p>White - {whiteTime}</p>
        {currentPlayer.color === COLORS.WHITE && <ArrowIcon/>}
      </div>
      <button onClick={onRestartGame}>Restart game <RestartIcon/></button>
    </div>
  );
};