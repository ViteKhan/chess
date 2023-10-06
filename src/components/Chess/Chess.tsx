import { usePlayers, useRestartBoard } from 'hooks';
import { BoardComponent } from '../Board';
import { LostFigures } from '../LostFigures';
import { Timer } from '../Timer';

export const Chess = () => {
  const { board, setBoard, restart } = useRestartBoard();
  const { currentPlayer, swapPlayer } = usePlayers();

  return (
    <>
      <Timer currentPlayer={currentPlayer} restart={restart}/>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="Black figures" figures={board.lostBlackFigures}/>
        <LostFigures title="White figures" figures={board.lostWhiteFigures}/>
      </div>
    </>
  );
};