import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styles: []
})
export class ArquivoComponent implements OnInit {

  url: SafeResourceUrl = null;

  constructor(private route: ActivatedRoute, private sanitize: DomSanitizer) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data.url) {
        this.url = this.sanitize.bypassSecurityTrustResourceUrl(data.url);
      }
    });
  }

}
