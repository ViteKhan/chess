import './App.css';
import { useEffect, useState } from 'react';
import { BoardComponent } from 'components/Board';
import { Board } from 'models/Board';

function App() {
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

  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
      />
    </div>
  );
}

export default App;
