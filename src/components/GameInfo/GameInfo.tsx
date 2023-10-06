import { FC } from 'react';
import { Player } from 'models/Player';
import { Timer } from '../Timer';
import './GameInfo.scss';

interface GameInfoProps {
  currentPlayer: Player;
  restart: () => void;
}

export const GameInfo: FC<GameInfoProps> = ({ currentPlayer, restart }) => {
  return (
    <div className="gameInfo">
      <h2>Current player is {currentPlayer.color}</h2>
      <Timer currentPlayer={currentPlayer} restart={restart}/>
    </div>
  );
};