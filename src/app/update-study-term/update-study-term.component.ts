import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-study-term',
  templateUrl: './update-study-term.component.html',
  styleUrls: ['./update-study-term.component.css']
})
export class UpdateStudyTermComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}
  addedTerms: any = null;
  termNames: string[] = [];
  name = '';
  startDate: Date = null;
  endDate: Date = null;
  newCourse = '';
  courses: string[] = [];
  ngOnInit() {
    const userUID = this.afAuth.auth.currentUser.uid;
    const document = this.afs.collection<any>('users').doc(userUID);
    document.valueChanges().subscribe((terms: any) => {
      this.addedTerms = terms;
      this.termNames = Object.keys(terms);
    });
  }
  async update() {
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
  loadTerm() {
    this.startDate = new Date(
      this.addedTerms[this.name].startDate.seconds * 1000
    );
    this.endDate = new Date(this.addedTerms[this.name].endDate.seconds * 1000);
    this.courses = this.addedTerms[this.name].courses;
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
