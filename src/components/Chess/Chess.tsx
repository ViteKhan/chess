import { usePlayers, useRestartBoard } from 'hooks';
import { BoardComponent } from '../Board';
import { GameInfo } from '../GameInfo';
import { LostFigures } from '../LostFigures';

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
      <div>
        <LostFigures title="Black figures" figures={board.lostBlackFigures}/>
        <LostFigures title="White figures" figures={board.lostWhiteFigures}/>
      </div>
    </>
  );
};