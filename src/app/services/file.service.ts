import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {map, tap, filter} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http: HttpClient, protected sanatizer: DomSanitizer) {
    console.log('FileService Ok');
  }

  protected doDownload(file: File, filename?: string) {
    const blobUrl = URL.createObjectURL(file);
    this.downloadBlob(blobUrl, filename);
  }

  downloadBlob(blobUrl, filename) {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.setAttribute('download', filename);
    a.click();
    URL.revokeObjectURL(blobUrl);
  }

  async download(url: string,
                 progressCb?: (progress: { type: number; loaded: number; total: number; response?: HttpResponse<any> }) => void) {
    const $evt = await this.http.get(url, {
      observe: 'events',
      responseType: 'blob',
      reportProgress: true
    }).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt.type === HttpEventType.DownloadProgress && progressCb) {
          progressCb(evt as { type: number; loaded: number; total: number });
        }
      }),
      filter(evt => evt instanceof HttpResponse),
      map((evt: HttpResponse<Blob>) => evt)
    ).toPromise();
    if (progressCb) {
      progressCb({type: 0, loaded: 0, total: 0, response: $evt});
    }
    return URL.createObjectURL($evt.body);
  }

  async downloadPost(url: string,
                     data: any,
                     progressCb?: (progress: { type: number; loaded: number; total: number; response?: HttpResponse<any> }) => void) {
    const $evt = await this.http.post(url, data, {
      observe: 'events',
      responseType: 'blob',
      reportProgress: true
    }).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt.type === HttpEventType.DownloadProgress && progressCb) {
          progressCb(evt as { type: number; loaded: number; total: number });
        }
      }),
      filter(evt => evt instanceof HttpResponse),
      map((evt: HttpResponse<Blob>) => evt)
    ).toPromise();
    if (progressCb) {
      progressCb({type: 0, loaded: 0, total: 0, response: $evt});
    }
    return URL.createObjectURL($evt.body);
  }

  async urlToBlobDownload(url: string,
                          filename: string,
                          progressCb?: (progress: { type: number; loaded: number; total: number } | HttpResponse<any>) => void,
                          data?: any) {

    const callback = (arg) => {
      if (progressCb) {
        progressCb(arg);
      }
      if (arg.response && arg.response instanceof HttpResponse) {
        const cd = arg.response.headers.get('content-disposition');
        console.log(cd);
        if (!filename || filename.trim().length === 0) {
          const m = cd?.match(/filename=(.+);/);
          if (m) {
            filename = m[1];
          } else {
            filename = 'noname';
          }
        }
      }
    };
    const blobUrl = await (data ? this.downloadPost(url, data, callback) : this.download(url, callback));
    this.downloadBlob(blobUrl, filename);
  }

  toBlob(url: string, name: string = 'blob') {
    return this.http.get(url, {
      responseType: 'blob'
    }).pipe(map(value => this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(new File([value], name)))));
  }


}
