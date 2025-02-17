import { Injectable } from '@angular/core';
import {POKEMON_RULES} from "../../features/pokemon/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private errorMessages: { [key: string]: { [key: string]: string }} = {
    name: {
      required: 'Le nom est requis',
      minlength: `Le nom doit contenir au moins ${POKEMON_RULES.MIN_NAME} caractères`,
      maxlength: `Le nom doit contenir au maximum ${POKEMON_RULES.MAX_NAME} caractères`,
      pattern: 'Le nom ne doit contenir que des lettres'
    },
    life: {
      required: 'Les points de vie sont obligatoires',
    },
    damage: {
      required: 'Les points de dégât sont obligatoire',
    }
  }

  getErrorMessage(field: string, error: string): string {
    return this.errorMessages[field]?.[error] || 'Champ invalide';
  }

}
