import { createContext, FC, ReactNode } from 'react';
import { usePlayers, useRestartBoard } from 'hooks';
import { Board } from '../models/Board';
import { Player } from '../models/Player';

interface ChessContextModel {
  currentPlayer: Player;
  board: Board;
  setBoard: (board: Board) => void;
  restartBoard: () => void;
  swapPlayer: () => void;
}

export const ChessContext = createContext<ChessContextModel>(null!);

interface ChessContextProviderProps {
  children: ReactNode;
}

export const ChessContextProvider: FC<ChessContextProviderProps> = ({ children }) => {
  const { currentPlayer, setCurrentPlayer, swapPlayer } = usePlayers();
  const { board, restartBoard, setBoard } = useRestartBoard(setCurrentPlayer);
  return (
    <ChessContext.Provider value={{ board, currentPlayer, setBoard, restartBoard, swapPlayer }}>
      {children}
    </ChessContext.Provider>
  );
};