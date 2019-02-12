import { InjectionToken } from '@angular/core';


export interface AppConfig {
    api_url: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG_PROD: AppConfig = {
    api_url: "https://taesagestor.azurewebsites.net/api"
};
export const APP_CONFIG_DEV: AppConfig = {
    api_url: "https://taesagestor.azurewebsites.net/api"
};

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true
};