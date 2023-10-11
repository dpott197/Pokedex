import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../interfaces/Pokemon';

interface PokemonState {
  list: Pokemon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchTerm: string;
  searchHistory: string[]; // Add this line
}

// Define the action payload types
interface FetchPokemonsPayload {
  limit: number;
  offset: number;
}

export const fetchPokemonList = createAsyncThunk<Pokemon[], FetchPokemonsPayload>(
  'pokemon/fetchPokemonList',
  async (payload) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${payload.limit}&offset=${payload.offset}`);
    const data = await response.json();
    return data.results;
  }
);

const initialState: PokemonState = {
  list: [],
  status: 'idle',
  searchTerm: '',
  searchHistory: [], // Add this line
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonList.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload];
      })
      .addCase(fetchPokemonList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSearchTerm } = pokemonSlice.actions;

export default pokemonSlice.reducer;