import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-study-term',
  templateUrl: './update-study-term.component.html',
  styleUrls: ['./update-study-term.component.css']
})
export class UpdateStudyTermComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private api: ApiService) {}
  addedTerms: any = null;
  termNames: string[] = [];
  name = '';
  startDate: Date = null;
  endDate: Date = null;
  newCourse = '';
  courses: any = null;
  courseNames: string[] = [];
  async ngOnInit() {
    this.api.getTerms().subscribe((data: any) => {
      this.addedTerms = data;
      this.termNames = Object.keys(data);
    });
  }
  update() {
    const term = {};
    term[this.name] = {
      startDate: this.startDate,
      endDate: this.endDate,
      courses: this.courses
    };
    this.api
      .updateTerm(term)
      .then(result => {
        this.showMessage(this.name + ' term was added!');
        this.clear();
      })
      .catch(error => {
        this.showMessage(error.message);
      });
  }
  addCourse() {
    if (this.newCourse !== '' && !this.courseNames.includes(this.newCourse)) {
      this.courses[this.newCourse] = [];
      this.courseNames.push(this.newCourse);
    }
    this.newCourse = '';
  }
  clear() {
    this.name = '';
    this.startDate = null;
    this.endDate = null;
    this.courses = [];
    this.newCourse = '';
    this.courseNames = [];
  }
  loadTerm() {
    this.startDate = new Date(
      this.addedTerms[this.name].startDate.seconds * 1000
    );
    this.endDate = new Date(this.addedTerms[this.name].endDate.seconds * 1000);
    this.courses = this.addedTerms[this.name].courses;
    this.courseNames = Object.keys(this.courses);
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
