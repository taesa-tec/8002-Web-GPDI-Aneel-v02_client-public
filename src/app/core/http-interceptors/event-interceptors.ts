import {Injectable, Inject} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppService} from '@app/services/app.service';
import {AuthService} from '@app/services/auth.service';


@Injectable()
export class EventInterceptor implements HttpInterceptor {

    url: string;

    constructor(protected auth: AuthService, protected app: AppService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = next.handle(req);
        return request.pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 401) {
                    this.auth.logout();
                }
            }
        }, error => {
            if (error.status === 401) {
                this.auth.logout();
            }
        }));
    }


}
