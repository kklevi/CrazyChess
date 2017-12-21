import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function notAllNumericValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const nameRe = /^\d+$/;
    const allNumeric = nameRe.test(control.value);
    return allNumeric ? {'notAllNumeric': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[notAllNumeric]',
  providers: [{provide: NG_VALIDATORS, useExisting: NotAllNumericValidatorDirective, multi: true}]
})
export class NotAllNumericValidatorDirective implements Validator {

  validate(control: AbstractControl): {[key: string]: any} {
    return notAllNumericValidator()(control);
  }
}

