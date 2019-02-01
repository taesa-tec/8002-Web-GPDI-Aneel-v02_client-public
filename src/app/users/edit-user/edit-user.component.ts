import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { UsersService } from '../users.service';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Empresa, ResultadoResponse, User, AppValidators } from '@app/models';
import { Observable, Observer } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;

  empresas: Observable<Array<Empresa>>;

  resultado: ResultadoResponse;

  user: User;

  constructor(
    protected catalog: CatalogsService,
    protected usersService: UsersService,
    protected route: ActivatedRoute,
    protected router: Router
  ) { }

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  ngOnInit() {
    this.getUser();
  }
  protected getUser() {
    this.loading.show();
    this.usersService.byId(this.route.snapshot.params.id).subscribe(user => {
      this.user = user; this.loading.hide();
    });
  }

  submit(value: any) {
    return this.usersService.edit(value);
  }

  onSubmited(value: ResultadoResponse) {

    try {
      if (value.sucesso) {
        this.router.navigate(['/dashboard', 'gerenciar-usuarios'], {
          queryParams: {
            message: 'user-updated'
          }
        });
      }
    } catch (e) {

    }

  }
}
