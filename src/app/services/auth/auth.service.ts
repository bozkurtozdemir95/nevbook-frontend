import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: any;

  constructor(private http: HttpClient) {
  }

  api = environment.serverURL;

  register(user: User): Observable<any> {
    return this.http.post(this.api + '/api/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.api + '/api/login', user);
  }

  logout(): Observable<any> {
    this.user = null;
    return this.http.get<any>(this.api + '/api/logout');
  }

  profileUser(): Observable<any> {
    return this.http.get(this.api + '/api/user-profile');
  }
}
