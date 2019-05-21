import { Component, OnInit } from '@angular/core';
import { auth } from '../auth.guard';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private author: auth,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}
  signOut() {
    this.afAuth.auth.signOut();
    this.author.setLoggedIn(false);
    localStorage.clear();
    this.router.navigate(['sign-in']);
  }
}
