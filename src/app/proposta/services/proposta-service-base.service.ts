import {Injectable, Provider} from '@angular/core';
import {ServiceBase} from '@app/services';
import {HttpClient} from '@angular/common/http';
import {PropostasService} from '@app/proposta/services/propostas.service';

@Injectable()
export class PropostaServiceBase extends ServiceBase<any> {

  static useExisting(t): Provider {
    return {
      provide: PropostaServiceBase,
      useExisting: t
    };
  }

  static fromAppend(append): Provider {
    return {
      provide: PropostaServiceBase,
      deps: [HttpClient, PropostasService],
      useFactory: (http: HttpClient, service: PropostasService) => new PropostaServiceBase(http, service, append)
    };
  }

  set captacaoId(value) {
    console.warn('Remover chamada');
    console.trace(value);
    this.controller = `Propostas/${value}/${this.append}`;
  }

  constructor(http: HttpClient, protected service: PropostasService, protected append: string) {
    super(http, 'Propostas');
    this.service.proposta.subscribe(p => {
      this.controller = `Propostas/${p.guid}/${this.append}`;
    });
  }
}


@Injectable()
export class PropostaService extends PropostaServiceBase {
  constructor(http: HttpClient, service: PropostasService) {
    super(http, service, '');
  }
}

@Injectable()
export class ProdutosService extends PropostaServiceBase {

  constructor(http: HttpClient, service: PropostasService) {
    super(http, service, 'Produtos');
  }
}

@Injectable()
export class EtapasService extends PropostaServiceBase {

  constructor(http: HttpClient, service: PropostasService) {
    super(http, service, 'Etapas');
  }
}

@Injectable()
export class RecursosHumanosService extends PropostaServiceBase {

  constructor(http: HttpClient, service: PropostasService) {
    super(http, service, 'RecursosHumano');
  }
}

@Injectable()
export class RecursosMateriaisService extends PropostaServiceBase {

  constructor(http: HttpClient, service: PropostasService) {
    super(http, service, 'RecursosMateriais');
  }
}

@Injectable()
export class ContratoService extends PropostaServiceBase {

  constructor(http: HttpClient, service: PropostasService) {
    super(http, service, 'Contrato');
  }

  async aprovar() {
    return await this.post('Aprovar', {});
  }

  async solicitarAlteracao(mensagem: string) {
    return await this.post('SolicitarAlteracao', {mensagem});
  }
}
