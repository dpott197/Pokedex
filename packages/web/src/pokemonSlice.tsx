import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  list: Pokemon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchTerm: string;
}

// Define the action payload types
interface FetchPokemonsPayload {
  limit: number;
  offset: number;
}

export const fetchPokemons = createAsyncThunk<Pokemon[], FetchPokemonsPayload>(
  'pokemon/fetchPokemons',
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
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload];
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSearchTerm } = pokemonSlice.actions;

export default pokemonSlice.reducer;