import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export const CAPTACAO_ID = new InjectionToken<BehaviorSubject<number>>('Captação Id');
export const PROPOSTA_API_URL = new InjectionToken<string>('Prefixo da Api de propostas');
export const PROPOSTA_READONLY = new InjectionToken<boolean>('Somente Leitura');

