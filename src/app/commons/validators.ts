import {ValidatorFn, AbstractControl, ValidationErrors, Validators, FormArray} from '@angular/forms';


export class AppValidators {

    /**
     *
     * @description Validar CPF
     * @param control
     */
    static cpf(control: AbstractControl): ValidationErrors | null {
        if (control.value === null || control.value === '') {
            return null;
        }
        const cpf = (control.value as string).replace(/\D/g, '');
        if (cpf.length !== 11) {
            return {cpf: true};
        }
        const isValid = [9, 10].map(n => {
            return cpf.substr(0, n).split('')
                .map((d, idx) => parseInt(d, 10) * (n + 1 - idx))
                .reduce((p, c) => p + c) * 10 % 11;
        }).map(d => d > 9 ? 0 : d).join('') === cpf.substr(9, 2);
        return isValid ? null : {cpf: true};
    }

    /**
     * @description Validar CNPJ
     * @param control
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

    static minFormArray(minItens: number) {
        return (formArray: FormArray): ValidationErrors | null => {
            if (formArray.length < minItens) {
                return {min: {min: minItens, actual: formArray.length}};
            }
            return null;
        };
    }

    static maxFormArray(maxItens: number) {
        return (formArray: FormArray): ValidationErrors | null => {
            if (formArray.length > maxItens) {
                return {max: {max: maxItens, actual: formArray.length}};
            }
            return null;
        };
    }
}


