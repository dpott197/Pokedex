import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

// Define the type of the entire Redux state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;