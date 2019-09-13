import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private author: auth,
    private snackBar: MatSnackBar
  ) {}
  userUID = null;
  document = null;
  updateTerm(term: any) {
    return this.document.update(term);
  }
  getTerms() {
    return this.document.valueChanges();
  }
  async signIn(username, password) {
    await this.afAuth.auth
      .signInWithEmailAndPassword(username, password)
      .then((resp: any) => {
        this.author.setLoggedIn(true);
        this.userUID = this.afAuth.auth.currentUser.uid;
        this.document = this.afs.collection<any>('users').doc(this.userUID);
        let get_doc = this.document.get().subscribe((val: any) => {
          if (!val.exists) {
            this.document.set({});
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
