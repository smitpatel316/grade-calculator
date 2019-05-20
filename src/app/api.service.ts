import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}
  userUID = this.afAuth.auth.currentUser.uid;
  document = this.afs.collection<any>('users').doc(this.userUID);
  updateTerm(term: any) {
    return this.document.update(term);
  }
  getTerms() {
    return this.document.valueChanges();
  }
}
