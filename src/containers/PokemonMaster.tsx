import { useState, useEffect } from 'react';
import './../App.css';
import { Pokemon } from '../interface/Pokemon';
import { capitalizeFirstLetter } from '../utils/utils';
import { Link } from 'react-router-dom';

const TOTAL_POKEMON = 1010;

function PokemonMaster() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const itemsPerPage = TOTAL_POKEMON;

  useEffect(() => {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setRecentSearches(prev => [value, ...prev].slice(0, 5)); // Store up to the last 5 searches
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm) {
      setRecentSearches(prev => [searchTerm, ...prev].slice(0, 5)); // Store up to the last 5 searches
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon List</h1>
        <input
          type="text"
          placeholder="🔍 Search Pokémon..."
          value={searchTerm}
          onChange={handleSearchInput}
          onKeyPress={handleKeyPress}
        />
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        </div>
        <div className="grid-container">
          {pokemonList.map(pokemon => (
            <Link to={`/pokemon/${pokemon.url.split('/')[6]}`} key={pokemon.url.split('/')[6]}>
              <div className="pokemon-item">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <span>{capitalizeFirstLetter(pokemon.name)}</span>
              </div>
            </Link>
          ))}
        </div>
      </header>
    </div>
  );
}

export default PokemonMaster;
