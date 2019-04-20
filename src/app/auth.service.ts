import { Router, CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';

export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    return environment.loggedIn;
  }
}
