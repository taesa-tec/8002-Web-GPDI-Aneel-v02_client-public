import { AppService } from '@app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documento-aprovacoes',
  templateUrl: './documento-aprovacoes.component.html',
  styleUrls: ['./documento-aprovacoes.component.scss']
})
export class DocumentoAprovacoesComponent implements OnInit {

  status: any;
  desc: any;
  avatar: SafeUrl;
  hora: any;
  minuto: any;
  constructor(private app: AppService) { }
  ngOnInit() {
    this.status = 1;
    this.coment();
    this.avatar = 'https://taesagestor.azurewebsites.net/api/Users/3a1d3966-3eb2-48bb-9df0-c36bc1f43d77/avatar';
    this.hora = Date.now();
    this.minuto = Date.now();
  }

  coment(){
    return this.desc = localStorage.getItem('demandaReprovada');
  }

  download() {
    this.app.alert("Seu download irá começar em instantes");
  }
  enviarProximaEtapa() {
    console.log('Enviado para próxima etapa');
  }
}

