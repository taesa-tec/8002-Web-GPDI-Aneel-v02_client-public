import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ResultadoResponse, FileUploaded } from '@app/models';
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
    download(file: FileUploaded);
    download(file: number | string, name: string);
    download(file, name?: string) {

        const id = typeof file === 'object' ? file.id : file;

        const filename = name ? name : file.nomeArquivo;

        this.http.get(`upload/download/${id}`, {
            observe: "response",
            responseType: "blob"
        }).subscribe((response: HttpResponse<any>) => {


            const f = new Blob([response.body], {
                type: "image/jpeg",
            });
            const a = document.createElement('a');
            const blobUrl = URL.createObjectURL(f);
            // PQP que gambiarra 
            a.href = blobUrl;
            a.setAttribute('download', filename);
            a.click();
            URL.revokeObjectURL(blobUrl);
        }, (error: HttpErrorResponse) => {

        });
    }
    downloadLogDuto(id: number) {
        return this.http.get<any>(`upload/${id}/ObterLogDuto`);
    }
}
