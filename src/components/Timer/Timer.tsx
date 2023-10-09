import { Player } from 'models/Player';
import React, { FC } from 'react';
import { ReactComponent as TimerIcon } from '../../assets/icons/timer.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { COLORS } from 'types';
import './Timer.scss';
import { RestartButton } from '../RestartButton';

interface TimerProps {
  currentPlayer: Player;
  whiteTime: number;
  blackTime: number;
  onRestartGame: () => void;
}

export const Timer: FC<TimerProps> = ({ currentPlayer, blackTime, whiteTime, onRestartGame }) => {
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
      <RestartButton onClick={onRestartGame}/>
    </div>
  );
};