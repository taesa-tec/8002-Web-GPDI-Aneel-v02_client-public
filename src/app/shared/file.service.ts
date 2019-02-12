import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultadoResponse } from '@app/models';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FileService {


    constructor(private http: HttpClient) { }

    upload(file: File, form?: FormGroup) {
        const formData = new FormData();

        if (form) {
            console.log(form.value);

            for (let key in form.value) {
                if (form.get(key)) {
                    formData.append(key, form.get(key).value);
                }
            }
        }
        formData.append('file', file);

        return this.http.post<ResultadoResponse>('upload', formData);
    }

    download(id: number) {
        return this.http.get<any>(`upload/${id}/Download`);
    }
    downloadLogDuto(id: number) {
        return this.http.get<any>(`upload/${id}/ObterLogDuto`);
    }
}
