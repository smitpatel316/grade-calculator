import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-study-term',
  templateUrl: './add-study-term.component.html',
  styleUrls: ['./add-study-term.component.css']
})
export class AddStudyTermComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private api: ApiService) {}
  name = '';
  startDate: any = null;
  endDate: any = null;
  newCourse = '';
  courses: any = {};
  courseNames: string[] = [];
  ngOnInit() {}
  submit() {
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
    this.courses = {};
    this.newCourse = '';
    this.courseNames = [];
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
  deleteCourse(course: string) {
    const index = this.courseNames.indexOf(course, 0);
    if (index > -1) {
      this.courseNames.splice(index, 1);
    }
    delete this.courses[course];
  }
}
