import {Injectable, Inject} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@app/core/services/auth.service';
import {environment} from '@env/environment';


@Injectable()
export class APIInterceptor implements HttpInterceptor {

    url: string;

    constructor(protected auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({url: `${environment.api_url}/${req.url}`});
        return next.handle(apiReq);
    }
}
