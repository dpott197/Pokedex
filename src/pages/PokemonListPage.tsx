import { useState, useEffect } from 'react';
import './../App.css';
import { Pokemon } from './../interface/Pokemon';
import { capitalizeFirstLetter } from './../utils/utils';

// Source: https://www.pokemon.com/us/pokedex
const TOTAL_POKEMON = 1010

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = TOTAL_POKEMON;

  useEffect(() => {
    // Reset the list when the search term changes
    setPokemonList([]);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`)
      .then(response => response.json())
      .then(data => {
        const filteredPokemon = data.results.filter((pokemon: Pokemon) => pokemon.name.includes(searchTerm.toLowerCase()));
        setPokemonList(prev => [...prev, ...filteredPokemon]);
      });
  }, [currentPage, searchTerm]);

  // ... (rest of the imports and states)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon List</h1>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
          <div className="grid-container">
            {pokemonList.map(pokemon => (
              <div key={pokemon.name} className="pokemon-item">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <span>{capitalizeFirstLetter(pokemon.name)}</span>
              </div>
            ))}
          </div>
      </header>
    </div>
  );
}

export default PokemonList;