import {Injectable, Inject} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@app/core/services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    url: string;

    constructor(protected auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let apiReq = req.clone();

        if (this.auth.token) {
            apiReq = apiReq.clone({
                setHeaders: {Authorization: `Bearer ${this.auth.token}`}
            });
        }

        return next.handle(apiReq);
    }
}
