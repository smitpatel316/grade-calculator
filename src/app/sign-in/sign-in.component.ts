import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from '../auth.guard';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  token = '';
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private author: auth
  ) {}

  async ngOnInit() {
    if (
      sessionStorage.getItem('username') &&
      sessionStorage.getItem('password')
    ) {
      this.username = sessionStorage.getItem('username');
      this.password = sessionStorage.getItem('password');
      await this.signIn();
    }
  }
  signUp() {
    this.router.navigate(['sign-up']);
  }
  async signIn() {
    await this.afAuth.auth
      .signInWithEmailAndPassword(this.username, this.password)
      .then((resp: any) => {
        this.showMessage('Log In Successful');
        this.author.setLoggedIn(true);
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('password', this.password);
        this.router.navigate(['home']);
      })
      .catch(error => {
        this.showMessage(error.message);
        this.author.setLoggedIn(false);
      });
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 10000
    });
  }
}
