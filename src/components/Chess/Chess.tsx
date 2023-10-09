import { useChessContext } from 'hooks';
import { BoardComponent } from '../Board';
import { GameInfo } from '../GameInfo';
import { LostFigures } from '../LostFigures';
import './Chess.scss';

export const Chess = () => {
  const { board } = useChessContext();

  return (
    <>
      <GameInfo/>
      <BoardComponent board={board}/>
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