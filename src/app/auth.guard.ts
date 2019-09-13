import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export class auth {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor() {}
  setLoggedIn(val: boolean) {
    this.loggedIn.next(val);
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private author: auth) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.author.isLoggedIn;
  }
}
