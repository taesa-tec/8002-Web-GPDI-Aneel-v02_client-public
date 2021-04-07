import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateUserRequest, ResultadoResponse, User, UserProjeto, NiveisUsuarios, Permissao, Projeto, Roles, UserRole} from '@app/commons';
import {Observable, BehaviorSubject, Subject} from 'rxjs';

import {AuthService} from '@app/services/auth.service';
import {CatalogsService} from '@app/services/catalogs.service';
import {SistemaService} from '@app/services/sistema.service';
import {ServiceBase} from '@app/services/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ServiceBase<any> {

  protected $avatarUpdated = new Subject();
  avatarUpdated = this.$avatarUpdated.asObservable();

  constructor(protected http: HttpClient,
              protected auth: AuthService, protected catalogo: CatalogsService, protected sistema: SistemaService) {
    super(http, 'Users');
  }

  me() {
    return this.http.get<User>(`Me`);
  }

  async editMe(user: User) {
    return await this.http.put<ResultadoResponse>(`Me`, user).toPromise();
  }

  async updateAvatar(file: File, userId = 'me') {
    const formData = new FormData();
    formData.append('file', file);
    if (userId !== 'me') {
      await this.http.post<any>(`Users/${userId}/Avatar`, formData).toPromise();
    } else {
      await this.http.post<any>(`Me/Avatar`, formData).toPromise();
      this.$avatarUpdated.next(Date.now());
    }
  }

  async all() {
    return await this.http.get<Array<User>>(`Users`).toPromise();
  }

  async usersInRole(role: string) {
    return await this.http.get<Array<User>>(`Users/Role/${role}`).toPromise();
  }
}
