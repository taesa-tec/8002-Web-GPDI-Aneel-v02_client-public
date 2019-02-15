import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { AuthService } from '@app/auth/auth.service';
import { tap } from 'rxjs/operators';
import { AppService } from '@app/app.service';


@Injectable()
export class EventInterceptor implements HttpInterceptor {

    url: string;

    constructor(@Inject(APP_CONFIG) protected config: AppConfig, protected app: AppService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req).pipe(tap(event => {

            if (event instanceof HttpResponse) {
                switch (event.status) {
                    case 401:
                        this.app.auth.logout();
                        break;
                }
            }
        }));
    }
}
