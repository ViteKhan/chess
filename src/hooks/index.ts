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

const useSelectedCell = (updateBoard: () => void) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const onSelectCellHandler = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      updateBoard();
    } else {
      setSelectedCell(cell);
    }
  };

  return { selectedCell, onSelectCellHandler };
};

export const useHighlightCellsAndUpdateBoard = (board: Board, setBoard: (board: Board) => void) => {
  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const {selectedCell, onSelectCellHandler} = useSelectedCell(updateBoard);

  useEffect(() => {
    board.highlightCells(selectedCell);
    updateBoard();
  }, [selectedCell]); // eslint-disable-line react-hooks/exhaustive-deps

  return { selectedCell, onSelectCellHandler };
};