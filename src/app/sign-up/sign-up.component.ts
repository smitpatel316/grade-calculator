import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {}
  signUp() {
    this.afAuth.auth
      .createUserWithEmailAndPassword(this.username, this.password)
      .then((res: any) => {
        this.showMessage('Account Created Successfully');
      })
      .catch(error => this.showMessage(error.message));
  }
  showMessage(message) {
    this.snackBar.open(message, 'Close', {
      duration: 10000
    });
  }
  signIn() {
    this.router.navigate(['sign-in']);
  }
}
