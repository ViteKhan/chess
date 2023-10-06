import './App.css';
import { BoardComponent } from 'components/Board';
import { LostFigures } from './components/LostFigures';
import { useRestartBoard } from './hooks';

function App() {
  const { board, setBoard } = useRestartBoard();

  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
      />
      <div>
        <LostFigures title="Black figures" figures={board.lostBlackFigures}/>
        <LostFigures title="White figures" figures={board.lostWhiteFigures}/>
      </div>
    </div>
  );
}

export default App;
