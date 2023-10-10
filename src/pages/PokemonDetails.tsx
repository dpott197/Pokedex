import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PokemonData {
    name: string;
    sprites: {
      front_default: string;
    };
}

function PokemonDetails() {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => setPokemonDetails(data));
  }, [id]);

  if (!pokemonDetails) { 
    return <div>Loading...</div>;
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="pokemon-details" style={{ 
        width: '300px', 
        padding: '20px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        borderRadius: '10px', 
        backgroundColor: 'rgba(255, 255, 255, 0.1)'  /* Slightly transparent background */
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>{pokemonDetails.name}</h2>
        <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} style={{ width: '100%', borderRadius: '50%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
      </div>
    </div>
  );  
}

export default PokemonDetails;
