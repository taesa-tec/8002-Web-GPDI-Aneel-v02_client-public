import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '@app/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCancelarCaptacaoComponent } from './modal-cancelar-captacao/modal-cancelar-captacao.component';

@Component({
  selector: 'app-alteracao-proposta',
  templateUrl: './alteracao-proposta.component.html',
  styleUrls: ['./alteracao-proposta.component.scss']
})
export class AlteracaoPropostaComponent implements OnInit {

  proposta: any;
  formProposta: FormGroup;

  constructor(
    protected app: AppService, 
    private fb: FormBuilder,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.proposta = this._getProposta();
    this.configForm();
  }

  async configForm() {
    this.formProposta = this.fb.group({
      dataProposta: ['', Validators.required]
    });

    this.formProposta.patchValue(this.proposta);
  }

  async cancelarCaptacao() {
    const modalRef = this.modal.open(ModalCancelarCaptacaoComponent, {size: 'lg'});

      try {
        await modalRef.result;
        console.log('Captação encerrada');

      } catch(e) {
        console.log(e);
      }
  }

  onSubmit() {
    if(this.formProposta.valid) {
      console.log(this.formProposta.value);
    }
  }

  _getProposta() {
    return {
      modeloContrato: 'Contrato Padrão',
      arquivos: ['Relatório.pdf', 'Relatório 2.pdf'],
      consideracoes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra malesuada ante nec ornare. Nam id ante et odio efficitur cursus. Maecenas viverra turpis a eros pretium porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi porttitor ligula id lacus maximus, eu rhoncus tortor volutpat. Curabitur auctor nulla sed lacus maximus vulputate. Fusce elementum metus nec urna malesuada, a accumsan eros sodales. Suspendisse dolor nisi, aliquet non luctus ac, sodales quis metus. Nunc a fermentum mauris. Sed a nulla eget purus ultricies semper. Mauris vitae eros nec eros lacinia efficitur. In vitae justo scelerisque, elementum magna eu, placerat magna. Mauris faucibus varius nisl eu vehicula.',
      dataProposta: '2020-06-02',
      fornecedores: ['Nome Fornecedores 01', 'Nome Fornecedores 02']
    };
  }

}
