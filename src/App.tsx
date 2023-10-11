import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonDetail from './containers/PokemonDetail';
import PokemonMaster from './containers/PokemonMaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonMaster />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
