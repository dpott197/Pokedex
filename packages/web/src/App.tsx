import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 150;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          setCurrentPage(prev => prev + 1);
        }
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [listRef.current]);

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
        <div className="scrollable-list" ref={listRef}>
          <ul>
            {pokemonList.map(pokemon => (
              <li key={pokemon.name}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
