import { useEffect } from 'react';
import './../App.css';
import { capitalizeFirstLetter } from '../utils/utils';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList, setSearchTerm } from './../redux/slices/pokemonSlice'; // Import the actions and selectors
import { AppDispatch, RootState } from '../redux/store';

function PokemonList() {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonList = useSelector((state: RootState) => state.pokemon.list);
  const status = useSelector((state: RootState) => state.pokemon.status);
  const searchTerm = useSelector((state: RootState) => state.pokemon.searchTerm);

  useEffect(() => {
    // Fetch the list when the component mounts
    dispatch(fetchPokemonList({ limit: 1010, offset: 0 }));
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon List</h1>
        <input
          type="text"
          placeholder="🔍 Search Pokémon..."
          value={searchTerm}
          onChange={e => dispatch(setSearchTerm(e.target.value))}
        />
      <div className="grid-container">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && pokemonList.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase())).map(pokemon => (
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
        {status === 'failed' && <p>Error fetching data</p>}
      </div>
      </header>
    </div>
  );
}

export default PokemonList;
