import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData();

    files.forEach(file =>
      formData.append('file', file, file.name)
    );

    const request = new HttpRequest('POST', url, formData);

    return this.http.request(request);
  }

  download(url: string){
    return this.http.get(url, {
      responseType: 'blob' as 'json'
    });
  }
}
