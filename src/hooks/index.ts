import { useEffect, useState } from 'react';
import { Cell } from 'models/Cell';
import { Board } from 'models/Board';

export const useRestartBoard = () => {
  const [board, setBoard] = useState<Board>(new Board());

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  useEffect(() => {
    restart();
  }, []);

  return { board, setBoard };
};

export const useSelectedCell = () => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const onSelectCellHandler = (cell: Cell) => {
    if (cell.figure) {
      setSelectedCell(cell);
    }
  };

  return { selectedCell, onSelectCellHandler };
};

export const useUpdateBoard = (board: Board, setBoard: (board: Board) => void, selectedCell: Cell | null) => {
  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  useEffect(() => {
    board.highlightCells(selectedCell);
    updateBoard();
  }, [selectedCell]); // eslint-disable-line react-hooks/exhaustive-deps
};