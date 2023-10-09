import './App.scss';
import { Chess } from 'components/Chess';
import { ChessContextProvider } from 'providers';

function App() {
  return (
    <div className="app">
      <ChessContextProvider>
        <Chess/>
      </ChessContextProvider>
    </div>
  );
}

export default App;
