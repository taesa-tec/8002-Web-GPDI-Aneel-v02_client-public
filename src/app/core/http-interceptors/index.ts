import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {APIInterceptor} from './api-interceptor';
import {AuthInterceptor} from './auth-iterceptor';
import {EventInterceptor} from './event-interceptors';

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: EventInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];
