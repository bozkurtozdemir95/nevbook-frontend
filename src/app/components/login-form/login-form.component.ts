import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {TokenService} from "../../services/auth/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  loginForm: FormGroup;
  errors: any = null;

  constructor(public router: Router, public fb: FormBuilder, public authService: AuthService, public token: TokenService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (result: any) => {
        this.authService.user = {name: result.name, email: result.email};
        this.token.handleData(result.access_token);
        localStorage.setItem('user', JSON.stringify(this.authService.user));
      },
      (error: any) => {
        this.errors = error.error;
      },
      () => {
        this.loginForm.reset();
        this.router.navigate(['home']);
      }
    );
  }
}
