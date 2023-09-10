import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {CartService} from "../cart.service";

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

  constructor(private http: HttpClient, private cartService: CartService) {
  }

  api = environment.serverURL;

  register(user: User): Observable<any> {
    return this.http.post(this.api + '/api/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.api + '/api/login', user);
  }

  logout(): any {
    this.user = null;
    this.cartService.clearCart();
    this.http.get<any>(this.api + '/api/logout');
    localStorage.clear();
  }

  profileUser(): Observable<any> {
    return this.http.get(this.api + '/api/user-profile');
  }
}
