import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { AuthService } from '@app/auth/auth.service';
import { tap } from 'rxjs/operators';
import { AppService } from '@app/app.service';
import { RequestCacheService } from '@app/request-cache.service';


@Injectable()
export class EventInterceptor implements HttpInterceptor {

    url: string;

    constructor(protected app: AppService, protected cache: RequestCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const cachedResponse = this.cache.get(req);
        const request = cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);

        return request.pipe(tap(event => {
            if (event instanceof HttpResponse) {
                switch (event.status) {
                    case 401:
                        this.app.auth.logout();
                        break;
                }
            }
        }, error => {
            if (error.status === 401) {
                this.app.auth.logout();
            }
        }));
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCacheService): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                cache.put(req, event);
            }
        }));
    }
}
