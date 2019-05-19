import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-study-term',
  templateUrl: './add-study-term.component.html',
  styleUrls: ['./add-study-term.component.css']
})
export class AddStudyTermComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}
  name = '';
  startDate: any = null;
  endDate: any = null;
  newCourse = '';
  courses: string[] = [];
  ngOnInit() {}
  async submit() {
    const userUID = this.afAuth.auth.currentUser.uid;
    const document = this.afs.collection<any>('users').doc(userUID);
    const term = {};
    term[this.name] = {
      startDate: this.startDate,
      endDate: this.endDate,
      courses: this.courses
    };
    document
      .update(term)
      .then(result => {
        this.showMessage(this.name + ' term was added!');
        this.clear();
      })
      .catch(error => {
        this.showMessage(error.message);
      });
  }
  addCourse() {
    if (this.newCourse !== '' && !this.courses.includes(this.newCourse)) {
      this.courses.push(this.newCourse);
    }
    this.newCourse = '';
  }
  clear() {
    this.name = '';
    this.startDate = null;
    this.endDate = null;
    this.courses = [];
    this.newCourse = '';
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
