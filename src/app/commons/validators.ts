import {ValidatorFn, AbstractControl, ValidationErrors, Validators, FormArray, FormControl} from '@angular/forms';


interface PasswordOptions {
  requiredLength?: number;
  //requiredUniqueChars?: number;
  requireNonAlphanumeric?: boolean;
  requireLowercase?: boolean;
  requireUppercase?: boolean;
  requireDigit?: boolean;
}

const passwordOptionDefault: PasswordOptions = {
  requiredLength: 6,
  //requiredUniqueChars: 1,
  requireNonAlphanumeric: true,
  requireDigit: true,
  requireLowercase: true,
  requireUppercase: true
};

function santizeDate(date: string): Date {
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(date)) {
    if (date.length === 10) {
      date = date.concat('T00:00:00');
    }
    return new Date(date);
  }
  throw new Error('Formato inválido de data, os formatos aceitos são 0000-00-00 e 0000-00-00T00:00:00');
}

function validateDateFactory(dateComparer: (d1: Date, d2: Date) => boolean) {

  return (date: Date | string) => {
    let d: Date;
    if (typeof date === 'string') {
      try {
        d = santizeDate(date);
      } catch (e) {
        console.error(e);
        d = new Date();
      }
    } else {
      d = date;
    }

    return (ctrl: FormControl): ValidationErrors | null => {
      try {
        const ctrldate = santizeDate(ctrl.value);
        if (!dateComparer(d, ctrldate)) {
          return {invalidDate: true};
        }
      } catch (e) {
        return {invalidDate: true};
      }
      return null;

    };
  };

}

export class AppValidators {

  static minDate = validateDateFactory((d1, d2) => d1.getTime() <= d2.getTime());
  static maxDate = validateDateFactory((d1, d2) => d1.getTime() >= d2.getTime());

  /**
   *
   * @description Validar CPF
   */
  static cpf(control: AbstractControl): ValidationErrors | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const cpf = (control.value as string).replace(/\D/g, '');
    if (cpf.length !== 11) {
      return {cpf: true};
    }
    const isValid = [9, 10].map(n => cpf.substr(0, n).split('')
      .map((d, idx) => parseInt(d, 10) * (n + 1 - idx))
      .reduce((p, c) => p + c) * 10 % 11).map(d => d > 9 ? 0 : d).join('') === cpf.substr(9, 2);
    return isValid ? null : {cpf: true};
  }

  /**
   * @description Validar CNPJ
   */
  static cnpj(control: AbstractControl): ValidationErrors | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const cnpj = (control.value as string).replace(/\D/g, '');

    if (cnpj.length !== 14) {
      return {cnpj: true};
    }

    const pesos = [
      [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
      [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    ];

    const isValid = pesos.map(n => 11 - (cnpj.substr(0, n.length)
      .split('')
      .map((x, i) => parseInt(x, 10) * n[i])
      .reduce((p, x) => p + x) % 11)
    ).map(d => d > 9 ? 0 : d).join('') === cnpj.substr(12, 2);

    return isValid ? null : {cnpj: true};
  }

  static cnpjOrCpf(control: AbstractControl): ValidationErrors | null {
    if (control.value === null || control.value === '') {
      return null;
    }

    return (control.value.length < 12) ? AppValidators.cpf(control) : AppValidators.cnpj(control);
  }


  static minInArray(min: number) {
    return (formArray: FormArray): ValidationErrors | null => {
      const fmin = Math.min(...formArray.value.map(n => parseFloat(n)));
      if (fmin && fmin < min) {
        return {min: {min: min, actual: fmin}};
      }
      return null;
    };
  }

  static minFormArray(minItens: number) {
    return (formArray: FormArray): ValidationErrors | null => {
      if (formArray.length < minItens) {
        return {min: {min: minItens, actual: formArray.length}};
      }
      return null;
    };
  }

  static isUrl(control: AbstractControl): ValidationErrors | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    return control.value.match(/^https?:\/\/.+\..+/) === null ? {url: false} : null;
  }

  static maxFormArray(maxItens: number) {
    return (formArray: FormArray): ValidationErrors | null => {
      if (formArray.length > maxItens) {
        return {max: {max: maxItens, actual: formArray.length}};
      }
      return null;
    };
  }

  static maxInArray(max: number) {
    return (formArray: FormArray): ValidationErrors | null => {
      const fmax = Math.max(...formArray.value.map(n => parseFloat(n)));
      if (fmax && fmax < max) {
        return {max: {max: max, actual: max}};
      }
      return null;
    };
  }

  static strongPass(config: PasswordOptions = passwordOptionDefault, errorDesc = true) {
    config = config ?? passwordOptionDefault;
    return (control: AbstractControl) => {
      if (control.value === null || control.value === '') {
        return null;
      }
      const value = control.value as string;
      const result = {
        length: (config?.requiredLength ?? 1) > value.length,
        uppercase: (config?.requireUppercase ?? false) && !/[A-Z]/.test(value),
        lowerCase: (config?.requireUppercase ?? false) && !/[a-z]/.test(value),
        nonAlphanumeric: (config?.requireNonAlphanumeric ?? false) && !/[!@#$%&*+\-_]/.test(value),
        digit: (config?.requireDigit ?? false) && !/\d/.test(value),
      };

      if (Object.entries(result).reduce((p, c) => p || c[1], false)) {
        return errorDesc ? result : {password: true};
      }
      return null;

    };
  }
}


