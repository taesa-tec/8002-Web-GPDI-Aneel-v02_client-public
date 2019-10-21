import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CriarDemanda {


    public redirectTo = '/dashboard';
    public demanda: any = 'assets/demanda.json';
    public result: any;


    constructor(private http: HttpClient, protected router: Router) {
    }


    novademanda(form) {
        // this.http.post<any>(this.demanda, form).subscribe(
        //     resp => {
        //         console.log('resp ', resp);
        //         return resp;
        //     },
        //     err => {
        //         console.log('err ',err);
        //         return err;
        //     }
        // );

        localStorage.setItem('TituloDemanda', JSON.stringify(form));


    }
}
