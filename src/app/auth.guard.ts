import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class auth {
  loggedIn = false;
  constructor() {}
  setLoggedIn(val: boolean) {
    this.loggedIn = val;
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private author: auth) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.author.loggedIn;
  }
}
