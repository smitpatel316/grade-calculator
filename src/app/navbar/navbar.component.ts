import { Component, OnInit } from '@angular/core';
import { auth } from '../auth.guard';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private author: auth,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}
  isLoggedIn$: Observable<boolean>;
  ngOnInit() {
    this.isLoggedIn$ = this.author.isLoggedIn;
    console.log(this.isLoggedIn$);
  }
  signOut() {
    this.afAuth.auth.signOut();
    this.author.setLoggedIn(false);
    localStorage.clear();
    this.router.navigate(['sign-in']);
  }
  home() {
    this.router.navigate(['home']);
  }
}
