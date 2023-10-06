import { usePlayers, useRestartBoard } from 'hooks';
import { BoardComponent } from '../Board';
import { LostFigures } from '../LostFigures';
import { Timer } from '../Timer';

export const Chess = () => {
  const { currentPlayer, swapPlayer, setCurrentPlayer } = usePlayers();
  const { board, setBoard, restart } = useRestartBoard(setCurrentPlayer);

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