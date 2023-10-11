import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import PokemonList from './pages/PokemonListPage'
// import PokemonDetails from './pages/PokemonDetailPage'; // This will be our new component
import PokemonList from './containers/PokemonList';
import Pokemon from './containers/Pokemon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </Router>
  );
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<PokemonListPage />} />
  //       <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
  //     </Routes>
  //   </Router>
  // );
}

export default App;
