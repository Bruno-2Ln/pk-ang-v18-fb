import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {PokemonListComponent} from "./features/pokemon/pokemon-list/pokemon-list.component";
import {provideRouter, Routes} from "@angular/router";
import {PokemonProfileComponent} from "./features/pokemon/pokemon-profile/pokemon-profile.component";
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {PokemonEditComponent} from "./features/pokemon/pokemon-edit/pokemon-edit.component";

const routes: Routes = [
  {
    path: 'pokemons/edit/:id',
    component: PokemonEditComponent,
    title: 'Pokémon',
  },
  {
    path: 'pokemons/:id',
    component: PokemonProfileComponent,
    title: 'Pokémon'
  },
  {
    path: 'pokemons',
    component: PokemonListComponent,
    title: 'Pokédex'
  },
  {
    path: '',
    redirectTo: '/pokemons',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page introuvable'
  },
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimationsAsync(),
    provideRouter(routes),]
};
