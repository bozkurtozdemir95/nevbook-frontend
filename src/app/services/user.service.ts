import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  importUsers(data: any) {
    return this.http.post(this.api + '/user/import', data);
  }

  getAll() {
    return this.http.get(this.api + '/user/get_all');
  }
  changeRole(id: number) {
    return this.http.get(this.api + '/user/change_role/' + id);
  }
}
