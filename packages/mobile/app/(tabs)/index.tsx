import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Image, TextInput } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  useEffect(() => {
    // Fetch the list of Pokémon from the API
    fetch('https://pokeapi.co/api/v2/pokedex/kanto/')
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.pokemon_entries);
      })
      .catch(error => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, []);

  // Filter the Pokémon list based on the search query
  const filteredPokemonList = pokemonList.filter(pokemon => 
    pokemon.pokemon_species.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPokemonList}
        keyExtractor={(item) => item.entry_number.toString()}
        renderItem={({ item }) => (
          <View style={styles.pokemonItem}>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.entry_number}.png` }}
              style={styles.pokemonImage}
            />
            <Text>{capitalizeFirstLetter(item.pokemon_species.name)}</Text>
          </View>
        )}
      />
    </View>
  );
}
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});