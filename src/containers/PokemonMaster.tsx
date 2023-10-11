import { useEffect, useState } from 'react'; // Import useState
import './../App.css';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList, setSearchTerm } from '../redux/slices/pokemonSlice';
import { AppDispatch, RootState } from '../redux/store';

function PokemonMaster() {
  const [localSearchTerm, setLocalSearchTerm] = useState(''); // Local state for the search input
  const dispatch = useDispatch<AppDispatch>();
  const pokemonList = useSelector((state: RootState) => state.pokemon.list);
  const status = useSelector((state: RootState) => state.pokemon.status);
  const searchTerm = useSelector((state: RootState) => state.pokemon.searchTerm);
  const searchHistory = useSelector((state: RootState) => state.pokemon.searchHistory);

  useEffect(() => {
    dispatch(fetchPokemonList({ limit: 1010, offset: 0 }));
  }, [dispatch]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setSearchTerm(localSearchTerm)); // Update the Redux state when Enter is pressed
      fetchPokemonList({ limit: 1010, offset: 0 })
    }
  };

  const getUniquePokemon = (list: typeof pokemonList) => {
    const uniqueNames = new Set();
    return list.filter(pokemon => {
      const name = pokemon.name.toLowerCase();
      if (uniqueNames.has(name)) {
        return false;
      }
      uniqueNames.add(name);
      return true;
    });
  };

  const uniquePokemonList = getUniquePokemon(pokemonList);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon List</h1>
        <input
          type="text"
          placeholder="🔍 Search Pokémon..."
          value={localSearchTerm}
          onChange={e => setLocalSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="search-history">
          <h3>Recent Searches:</h3>
          <ul>
            {searchHistory.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </div>
        <div className="grid-container">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'succeeded' && uniquePokemonList.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase())).map(pokemon => {
            const pokemonId = pokemon.url.split('/')[6]; // Extracting the Pokémon ID from the URL
            return (
              <Link to={`/pokemon/${pokemonId}`} key={pokemonId}>
                <div className="pokemon-item">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                  <span>#{pokemonId}</span>
                  <span>{capitalizeFirstLetter(pokemon.name)}</span>
                </div>
              </Link>
            );
          })}
          {status === 'failed' && <p>Error fetching data</p>}
        </div>
      </header>
    </div>
  );
}

export default PokemonMaster;
