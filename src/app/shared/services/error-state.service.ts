import { Injectable } from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ErrorStateService {
  private touchedFields: Set<string> = new Set();

  getErrorStateMatcher(fieldName: string): ErrorStateMatcher {
    return {
      isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
        return !!(control && control.invalid && this.touchedFields.has(fieldName));
      }
    };
  }

  setFieldTouched(fieldName: string): void {
    console.log(this.touchedFields);
    this.touchedFields.add(fieldName);
  }

}
