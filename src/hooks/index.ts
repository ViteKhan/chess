import { Board } from 'models/Board';
import { Cell } from 'models/Cell';
import { useContext, useEffect, useRef, useState } from 'react';
import { Player } from 'models/Player';
import { COLORS } from 'types';
import { ChessContext } from 'providers';

export const useChessContext = () => useContext(ChessContext);

export const useRestartBoard = (setCurrentPlayer: (player: Player) => void) => {
  const [board, setBoard] = useState<Board>(new Board());

  const restartBoard = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setCurrentPlayer(new Player(COLORS.WHITE));
    setBoard(newBoard);
  };

  useEffect(() => {
    restartBoard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { board, setBoard, restartBoard };
};

export const usePlayers = () => {
  const whitePlayer = new Player(COLORS.WHITE);
  const blackPlayer = new Player(COLORS.BLACK);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer);

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === COLORS.WHITE ? blackPlayer : whitePlayer);
  };

  return { currentPlayer, swapPlayer, setCurrentPlayer };
};

export const useSelectedCell = () => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const { board, setBoard, currentPlayer, swapPlayer, } = useChessContext();

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

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

  useEffect(() => {
    board.highlightCells(selectedCell);
    updateBoard();
  }, [selectedCell]); // eslint-disable-line react-hooks/exhaustive-deps

  return { selectedCell, onSelectCellHandler };
};

export const useTimer = () => {
  const [blackTime, setBlackTime] = useState<number>(300);
  const [whiteTime, setWhiteTime] = useState<number>(300);
  const timer = useRef<ReturnType<typeof setInterval> | null>();
  const { currentPlayer, restartBoard } = useChessContext();

  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1);
  };

  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1);
  };

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback = currentPlayer.color === COLORS.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  };

  const resetTimers = () => {
    setBlackTime(300);
    setWhiteTime(300);
  };

  useEffect(() => {
    startTimer();
    resetTimers();
  }, [currentPlayer]);  // eslint-disable-line react-hooks/exhaustive-deps

  const onRestartGame = () => {
    const confirmed = window.confirm('Are you sure you want to restart?');
    if (confirmed) {
      resetTimers();
      restartBoard();
    }
  };

  return { whiteTime, blackTime, onRestartGame };
};

