import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PokemonService} from "../pokemon.service";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {DatePipe, JsonPipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {getPokemonColor, POKEMON_RULES} from "../pokemon.model";
import {ErrorStateService} from "../../../shared/services/error-state.service";
import {ErrorMessageService} from "../../../core/services/error-message-service";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    DatePipe,
    MatInputModule,
    MatFormFieldModule,
    MatMiniFabButton,
    MatIconModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCheckboxModule,
    JsonPipe
  ],
  templateUrl: './pokemon-edit.component.html',
  styleUrl: './pokemon-edit.component.css'
})
export class PokemonEditComponent {

  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly errorStateService = inject(ErrorStateService);
  readonly errorMessageService = inject(ErrorMessageService);

  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(this.pokemon().life, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_LIFE),
      Validators.maxLength(POKEMON_RULES.MAX_LIFE)
    ]),
    damage: new FormControl(this.pokemon().damage, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_DAMAGE),
      Validators.maxLength(POKEMON_RULES.MAX_DAMAGE)
    ]),
    types: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type)),
      [
        Validators.required,
        Validators.maxLength(POKEMON_RULES.MAX_TYPES)
      ]
    ),
  });

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  get pokemonName() {
    return this.form.get('name') as FormControl;
  }

  get pokemonLife() {
    return this.form.get('life') as FormControl;
  }

  get pokemonDamage() {
    return this.form.get('damage') as FormControl;
  }

  isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value === type
    )
  }

  onPokemonTypeChange(type: string, isChecked: boolean): void {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      const index = this.pokemonTypeList.controls
        .map((control) => control.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt((index));
    }
  }

  getColor(type: string): string {
    return getPokemonColor(type)
  }

  onSubmit() {
    console.log(this.form.value);
  }

  getErrorStateMatcher(fieldName: string) {
    return this.errorStateService.getErrorStateMatcher(fieldName);
  }

  onBlur(fieldName: string) {
    this.errorStateService.setFieldTouched(fieldName);
  }

  getErrorMessage(fieldName: string): any {
    const control = this.form.get(fieldName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      return this.errorMessageService.getErrorMessage(fieldName, firstErrorKey);
    }
    return '';
  }

  incrementLife(field: FormControl, rule: string) {
    if (field.value < POKEMON_RULES[rule]) {
      const newValue = field.value + 1;
      field.setValue(newValue);
    }

  }

  decrementLife(field: FormControl, rule: string) {
    if (field.value > POKEMON_RULES[rule]) {
      const newValue = field.value - 1;
      field.setValue(newValue);
    }
  }

}
