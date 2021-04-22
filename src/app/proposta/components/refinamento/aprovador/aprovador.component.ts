import {Component, OnInit} from '@angular/core';
import {Proposta} from '@app/commons';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {AppService} from '@app/services';

@Component({
  selector: 'app-aprovador',
  templateUrl: './aprovador.component.html',
  styleUrls: ['./aprovador.component.scss']
})
export class AprovadorComponent implements OnInit {

  proposta: Proposta;
  arquivos: Array<any> = [];
  alteracaoRequerida = false;

  constructor(protected service: PropostasService, protected app: AppService) {
  }

  ngOnInit(): void {
    this.service.proposta.subscribe(p => this.proposta = p);
  }

  async anexarArquivos() {
    try {

      this.arquivos = await this.app.uploadForm([]);
      console.log(this.arquivos);
    } catch (e) {
      //
    }
  }

  async cancelarProcesso() {

    if (await this.app.confirm('Esta ação é irreversível. Ao cancelar o processo de refinamento o fornecedor será notificado por e-mail',
      'TEM CERTEZA QUE DESEJA CANCELAR O PREOCESSO DE REFINAMENTO?', [
        {text: 'Cancelar', value: false, cssClass: 'btn btn-link'},
        {
          text: 'Ok',
          value: true,
          cssClass: 'btn-primary',
          checked: false,
          checkMessage: 'Confirmo o cancelamento do processo de refinamento'
        }
      ])) {
      // @TODO Chamada a api para cancelamento
    }
  }


  async aprovar() {
    console.log('%cAprovado!', 'color:green;');
  }

  cancelarSolicitacao() {
    this.alteracaoRequerida = false;
  }

  solicitarAlteracao() {
    this.alteracaoRequerida = true;
  }

  async enviarSolicitacaoAlteracao() {

  }
}
