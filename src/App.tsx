import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './containers/PokemonListPage'
import PokemonDetails from './containers/PokemonDetails'; // This will be our new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
