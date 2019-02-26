import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { AuthService } from '@app/auth/auth.service';


@Injectable()
export class APIInterceptor implements HttpInterceptor {

    url: string;

    constructor(@Inject(APP_CONFIG) protected config: AppConfig, protected auth: AuthService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${this.config.api_url}/${req.url}` });
        return next.handle(apiReq);
    }
}
