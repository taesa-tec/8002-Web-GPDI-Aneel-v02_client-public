import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent implements OnInit {

  currentRoute = '';

  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url.map(u => u.path).join('/');
  }

}
