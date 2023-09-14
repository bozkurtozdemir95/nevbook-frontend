import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {AuthService} from "./auth.service";


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router:Router, private auth: AuthService ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    return this.auth.user.role === "admin";
  }

}
