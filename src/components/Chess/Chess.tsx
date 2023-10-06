import { usePlayers, useRestartBoard } from 'hooks';
import { BoardComponent } from '../Board';
import { GameInfo } from '../GameInfo';
import { LostFigures } from '../LostFigures';
import './Chess.scss';

export const Chess = () => {
  const { currentPlayer, swapPlayer, setCurrentPlayer } = usePlayers();
  const { board, setBoard, restart } = useRestartBoard(setCurrentPlayer);

  return (
    <>
      <GameInfo currentPlayer={currentPlayer} restart={restart}/>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className="lostFigures">
        <h2>Lost figures</h2>
        <div className="lostContainer">
          <LostFigures title="Black figures" figures={board.lostBlackFigures}/>
          <LostFigures title="White figures" figures={board.lostWhiteFigures}/>
        </div>
      </div>
    </>
  );
};