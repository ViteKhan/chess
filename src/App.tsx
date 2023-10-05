import './App.css';
import { BoardComponent } from 'components/Board';
import { useRestartBoard } from './hooks';

function App() {
  const { board, setBoard } = useRestartBoard();

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
