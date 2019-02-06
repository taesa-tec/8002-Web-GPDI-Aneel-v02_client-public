import { ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';


export class AppValidators {

  static cpf(control: AbstractControl): ValidationErrors | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const cpf = (control.value as string).replace(/\D/g, '');
    if (cpf.length !== 11) {
      return { cpf: true }
    }
    const isValid = [9, 10].map(n => {
      return cpf.substr(0, n).split('')
        .map((d, idx) => parseInt(d, 10) * (n + 1 - idx))
        .reduce((p, c) => p + c) * 10 % 11;
    }).map(d => d > 9 ? 0 : d).join('') === cpf.substr(9, 2);
    return isValid ? null : { cpf: true };
  }

}


