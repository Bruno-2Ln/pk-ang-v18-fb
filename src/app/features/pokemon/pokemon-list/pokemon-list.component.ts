import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PokemonService} from "../pokemon.service";
import {PokemonModel, PokemonList, PokemonSize} from "../pokemon.model";
import {MatCardModule} from "@angular/material/card";
import {CardColorBorderDirective} from "../../../shared/directives/card-color-border.directive";
import {DatePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatCardModule,
    CardColorBorderDirective,
    DatePipe,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  // name = signal('Pikachu');
  // life = signal(21);
  // size: Signal<PokemonSize> = computed(() => this.setSize());
  // imageSrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png');

  private readonly pokemonService = inject(PokemonService);
  pokemons: WritableSignal<PokemonList> = signal(this.pokemonService.getPokemonList());
  pokemonsResults = computed(() => this.setList(this.searchTerm()))
  searchTerm = signal('');


  constructor() {
    // effect(() => {
    //   console.log('La taille a changé :', this.size());
    // });
  }

  // incrementLife = (pokemon: PokemonModel, param = 1) => {
  //   // this.life.update(n => n + param);
  //   pokemon.life = pokemon.life + param;
  // }
  //
  // decrementLife = (pokemon: PokemonModel, param = 1) => {
  //   // this.life.update(n => n - param);
  //   pokemon.life = pokemon.life - param;
  // }

  setSize(pokemon: PokemonModel): PokemonSize {
    if (pokemon.life <= 15) {
      return 'Petit';
    } else if (pokemon.life >= 25) {
      return 'Grand';
    } else {
      return 'Moyen';
    }
  }

  setList = (searchTerm: string): PokemonList => {
    const term = searchTerm.toLowerCase().trim()
    return this.pokemons().filter(p => p.name.toLowerCase().includes(term))
  }

}
