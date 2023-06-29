import {Component} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  showLogin = true;

  constructor(public auth: AuthService,  public router: Router) {
  }


  changeForm() {
    this.showLogin = !this.showLogin;
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('user');

    this.router.navigate(['home']);
  }
}
