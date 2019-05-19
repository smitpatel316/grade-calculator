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
  name = '';
  startDate: any = null;
  endDate: any = null;
  newCourse = '';
  courses: string[] = [];
  ngOnInit() {}
  async submit() {
    let userUID = this.afAuth.auth.currentUser.uid;
    let document = this.afs.collection<any>('users').doc(userUID);
    let term = {};
    term[this.name] = {
      startDate: this.startDate,
      endDate: this.endDate,
      courses: this.courses
    };
    document.update(term);
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
}
