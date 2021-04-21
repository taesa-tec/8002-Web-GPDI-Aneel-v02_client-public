import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Proposta} from '@app/commons';

export const CAPTACAO_ID = new InjectionToken<BehaviorSubject<number>>('Captação Id');
export const PROPOSTA_API_URL = new InjectionToken<string>('Prefixo da Api de propostas');
export const PROPOSTA = new InjectionToken<BehaviorSubject<Proposta>>('Proposta Atual');
export const PROPOSTA_CAN_EDIT = new InjectionToken<boolean>('Proposta pode ser alterada');



