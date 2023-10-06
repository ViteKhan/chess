import './Board.scss';
import { Board } from 'models/Board';
import { FC, Fragment } from 'react';
import { useHighlightCellsAndUpdateBoard } from 'hooks';
import { CellComponent } from '../Cell';

interface BoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export const BoardComponent: FC<BoardComponentProps> = ({ board, setBoard }) => {
  const { selectedCell, onSelectCellHandler } = useHighlightCellsAndUpdateBoard(board, setBoard);

  return (
    <div className="board">
      {board.cells.map((row, idx) => (
        <Fragment key={idx}>
          {row.map(cell => (
            <CellComponent
              key={cell.id}
              cell={cell}
              isSelected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              onClick={onSelectCellHandler}
              selectedCell={selectedCell}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};