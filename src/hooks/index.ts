import { Board } from 'models/Board';
import { Cell } from 'models/Cell';
import { useEffect, useState } from 'react';
import { Player } from 'models/Player';
import { COLORS } from 'types';

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

export const usePlayers = () => {
  const whitePlayer = new Player(COLORS.WHITE);
  const blackPlayer = new Player(COLORS.BLACK);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer);

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === COLORS.WHITE ? blackPlayer : whitePlayer);
  };

  return { currentPlayer, swapPlayer };
};

interface UseSelectedCellProps {
  updateBoard: () => void;
  currentPlayer: Player;
  swapPlayer: () => void;
}

const useSelectedCell = ({ updateBoard, currentPlayer, swapPlayer }: UseSelectedCellProps) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const onSelectCellHandler = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer.color) {
        setSelectedCell(cell);
      }
    }
  };

  return { selectedCell, onSelectCellHandler };
};

interface UseHighlightCellsAndUpdateBoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player;
  swapPlayer: () => void;
}

export const useHighlightCellsAndUpdateBoard = ({ board, setBoard, currentPlayer, swapPlayer }: UseHighlightCellsAndUpdateBoardProps) => {
  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  const {selectedCell, onSelectCellHandler} = useSelectedCell({ updateBoard, currentPlayer, swapPlayer });

  useEffect(() => {
    board.highlightCells(selectedCell);
    updateBoard();
  }, [selectedCell]); // eslint-disable-line react-hooks/exhaustive-deps

  return { selectedCell, onSelectCellHandler };
};