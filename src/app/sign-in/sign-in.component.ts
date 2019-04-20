import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  signUp() {
    this.router.navigate(['sign-up']);
  }
  signIn() {
    this.afAuth.auth
      .signInWithEmailAndPassword(this.username, this.password)
      .then((resp: any) => {
        this.showMessage('Log In Successful');
        environment.loggedIn = true;
      })
      .catch(error => this.showMessage(error.message));
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 10000
    });
  }
}
