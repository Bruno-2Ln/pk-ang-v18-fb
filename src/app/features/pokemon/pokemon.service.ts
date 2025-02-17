import {Injectable} from '@angular/core';
import {POKEMON_LIST} from "../../core/pokemon-list.fake";
import {PokemonModel, PokemonList, PokemonType} from "./pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() {
  }

  getPokemonList = (): PokemonList => {
    return POKEMON_LIST;
  }

  getPokemonById = (id: number): PokemonModel => {
    const pokemon = POKEMON_LIST.find(p => p.id === id);

    if (!pokemon) {
      throw new Error(`No Pokemon found with id ${id}`);
    }

    return pokemon;
  }

  getPokemonTypeList = (): PokemonType[] => {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }


}
