import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/services';
import {Router} from '@angular/router';
import {RootsUrl} from '@app/routes/routes';

@Component({
  template: `<p>Redirecionando</p>`,
  styles: []
})
export class IndexComponent implements OnInit {

  constructor(protected auth: AuthService, protected route: Router) {
  }

  ngOnInit(): void {
    if (this.auth.user && RootsUrl.has(this.auth.user.role)) {
      this.route.navigate([RootsUrl.get(this.auth.user.role)]).then();
    }
    this.route.navigate(['/']).then();
  }

}
