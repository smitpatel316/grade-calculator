import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from '../auth.guard';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private author: auth,
    private afs: AngularFirestore
  ) {}

  async ngOnInit() {}
  signUp() {
    this.router.navigate(['sign-up']);
  }
  async signIn() {
    await this.afAuth.auth
      .signInWithEmailAndPassword(this.username, this.password)
      .then((resp: any) => {
        this.author.setLoggedIn(true);
        let userUID = this.afAuth.auth.currentUser.uid;
        let doc = this.afs.collection<any>('users').doc(userUID);
        let get_doc = doc.get().subscribe((val: any) => {
          if (!val.exists) {
            doc.set({});
          }
        });
        this.router.navigate(['home']);
      })
      .catch(error => {
        this.showMessage(error.message);
        this.author.setLoggedIn(false);
      });
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
