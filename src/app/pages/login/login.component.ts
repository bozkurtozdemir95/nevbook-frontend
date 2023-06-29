import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {}
  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (result: any) => {
        console.log(result.user);
        this.authService.user = result.user;
        localStorage.setItem('user', JSON.stringify(result.user));
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
