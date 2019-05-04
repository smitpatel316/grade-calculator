import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-study-term',
  templateUrl: './add-study-term.component.html',
  styleUrls: ['./add-study-term.component.css']
})
export class AddStudyTermComponent implements OnInit {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  ngOnInit() {}
  submit() {
    let userUID = this.afAuth.auth.currentUser.uid;
    let document = this.afs.collection<any>('users').doc(userUID);
    document.update({ name: 'smit patel' });
  }
}
