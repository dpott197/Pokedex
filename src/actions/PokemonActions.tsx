import axios from 'axios';
import { Dispatch } from 'redux';

interface PokemonListLoadingAction {
    type: 'POKEMON_LIST_LOADING';
}

interface PokemonListSuccessAction {
    type: 'POKEMON_LIST_SUCCESS';
    payload: any;
}

interface PokemonListFailAction {
    type: 'POKEMON_LIST_FAIL';
}

interface PokemonMultipleLoadingAction {
    type: 'POKEMON_MULTIPLE_LOADING';
}

interface PokemonMultipleSuccessAction {
    type: 'POKEMON_MULTIPLE_SUCCESS';
    payload: any;
    pokemonName: string;
}

interface PokemonMultipleFailAction {
    type: 'POKEMON_MULTIPLE_FAIL';
}

type PokemonAction =
    | PokemonListLoadingAction
    | PokemonListSuccessAction
    | PokemonListFailAction
    | PokemonMultipleLoadingAction
    | PokemonMultipleSuccessAction
    | PokemonMultipleFailAction;

export const GetPokemonList = (page: number) => async (dispatch: Dispatch<PokemonAction>) => {
    try {
        dispatch({
            type: "POKEMON_LIST_LOADING",
        });

        const perPage = 18;
        const offset = page * perPage - perPage;

        const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`
        );

        dispatch({
            type: "POKEMON_LIST_SUCCESS",
            payload: res.data,
        });
    } catch (e) {
        dispatch({
            type: "POKEMON_LIST_FAIL",
        });
    }
};

export const GetPokemon = (pokemon: string) => async (dispatch: Dispatch<PokemonAction>) => {
    try {
        dispatch({
            type: "POKEMON_MULTIPLE_LOADING",
        });

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        dispatch({
            type: "POKEMON_MULTIPLE_SUCCESS",
            payload: res.data,
            pokemonName: pokemon,
        });
    } catch (e) {
        dispatch({
            type: "POKEMON_MULTIPLE_FAIL",
        });
    }
};

export { };