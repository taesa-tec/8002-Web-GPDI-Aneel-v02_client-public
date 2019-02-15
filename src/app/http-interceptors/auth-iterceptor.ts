import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { AuthService } from '@app/auth/auth.service';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    url: string;

    constructor(@Inject(APP_CONFIG) protected config: AppConfig, protected auth: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        let apiReq = req.clone();

        if (this.auth.token) {
            apiReq = apiReq.clone({
                setHeaders: { Authorization: `Bearer ${this.auth.token}` }
            });
        }

        return next.handle(apiReq);
    }
}
