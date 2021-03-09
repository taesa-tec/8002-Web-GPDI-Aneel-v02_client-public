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

  async download(url: string, progressCb?: (progress: { type: number; loaded: number; total: number }) => void) {
    const blob = await this.http.get(url, {
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
      map((evt: HttpResponse<Blob>) => evt.body)
    ).toPromise();
    return URL.createObjectURL(blob);
  }

  toBlob(url: string, name: string = 'blob') {
    return this.http.get(url, {
      responseType: 'blob'
    }).pipe(map(value => {
      return this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(new File([value], name)));
    }));
  }


}
