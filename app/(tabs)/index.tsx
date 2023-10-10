import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  const [pokemonList, setPokemonList] = useState([]);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.entry_number.toString()}
        renderItem={({ item }) => (
          <View style={styles.pokemonItem}>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.entry_number}.png` }}
              style={styles.pokemonImage}
            />
            <Text>{item.pokemon_species.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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