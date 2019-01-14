import { InjectionToken } from '@angular/core';


export interface AppConfig {
    api_url: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG_PROD: AppConfig = {
    api_url: "https://xerminada.hopto.org:8081/api"
};
export const APP_CONFIG_DEV: AppConfig = {
    api_url: "https://xerminada.hopto.org:8081/api"
};
