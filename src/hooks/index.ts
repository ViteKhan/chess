import { Board } from 'models/Board';
import { Cell } from 'models/Cell';
import { useContext, useEffect, useRef, useState } from 'react';
import { Player } from 'models/Player';
import { COLORS } from 'types';
import { ChessContext } from 'providers';
import { TIMER_SECONDS } from '../constants';

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
  const [blackTime, setBlackTime] = useState<number>(TIMER_SECONDS);
  const [whiteTime, setWhiteTime] = useState<number>(TIMER_SECONDS);
  const timer = useRef<ReturnType<typeof setInterval> | null>();
  const { currentPlayer, restartBoard } = useChessContext();



  const decrementBlackTimer = () => {
    setBlackTime((prev) => {
      if (prev <= 0) {
        return 0;
      }
      return prev - 1;
    });
  };

  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => {
      if (prev <= 0) {
        return 0;
      }
      return prev - 1;
    });
  };

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback = currentPlayer.color === COLORS.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  };

  const resetTimers = () => {
    setBlackTime(TIMER_SECONDS);
    setWhiteTime(TIMER_SECONDS);
  };

  const onRestartGame = () => {
    resetTimers();
    restartBoard();
  };

  useEffect(() => {
    startTimer();
    resetTimers();
  }, [currentPlayer]);  // eslint-disable-line react-hooks/exhaustive-deps

  const confirmRestartGame = () => {
    const confirmed = window.confirm('Are you sure you want to restart?');
    if (confirmed) {
      onRestartGame();
    }
  };

  return { whiteTime, blackTime, onRestartGame, confirmRestartGame };
};

export const useGameOver = (whiteTime: number, blackTime: number) => {
  const { board } = useChessContext();

  const isDeadBlackKing = board.isDeadBlackKing();
  const isDeadWhiteKing = board.isDeadWhiteKing();
  const isBlackTimeOver = blackTime === 0;
  const isWhiteTimerOver = whiteTime === 0;

  const gameOverOptions = {
    message: '',
    reason: '',
    isOver: false,
  };

  if (isDeadBlackKing || isBlackTimeOver) {
    gameOverOptions.message = 'The Black player lost the game';
    gameOverOptions.isOver = true;
  }

  if (isDeadWhiteKing || isWhiteTimerOver) {
    gameOverOptions.message = 'The White player lost the game';
    gameOverOptions.isOver = true;
  }

  if (isBlackTimeOver || isWhiteTimerOver) {
    gameOverOptions.reason = 'Your time is over';
  }

  if (isDeadBlackKing || isDeadWhiteKing) {
    gameOverOptions.reason = 'Your king is dead';
  }

  return gameOverOptions;
};

export const useDisclosure = (defaultIsOpen: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onClose, setIsOpen };
};