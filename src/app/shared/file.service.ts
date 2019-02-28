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

    protected doDownload(file: File, filename?: string) {
        const a = document.createElement('a');
        const blobUrl = URL.createObjectURL(file);
        // PQP que gambiarra 
        a.href = blobUrl;
        a.setAttribute('download', filename || file.name);
        a.click();
        URL.revokeObjectURL(blobUrl);
    }

    download(file: File | FileUploaded);
    download(file: number | string, name: string);
    download(file, name?: string) {

        if (file instanceof File) {
            this.doDownload(file);
        } else {
            const id = typeof file === 'object' ? file.id : file;
            const filename = name ? name : file.nomeArquivo;
            this.http.get(`upload/download/${id}`, {
                responseType: "blob"
            }).subscribe((filedata: Blob) => {
                const f = new File([filedata], filename);
                this.doDownload(f);
            }, (error: HttpErrorResponse) => {
                console.log(error);
            });
        }
    }
    downloadLogDuto(id: number) {
        return this.http.get<any>(`upload/${id}/ObterLogDuto`);
    }


    remover(file: FileUploaded);
    remover(file: number);
    remover(file) {
        const id = typeof file === 'object' ? file.id : file;
        return this.http.delete(`upload/${id}`);
    }
}
