import { useState, useEffect } from 'react';
import './App.css';

// Define an interface for the Pokémon data
interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Fetch the first 20 Pokémon from the API
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon List</h1>
        <ul>
          {pokemonList.map(pokemon => (
            <li key={pokemon.name}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
              {pokemon.name}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
