import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

export interface Grade {
  name: string;
  grade: number;
  weight: number;
}
@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent implements OnInit {
  constructor(private api: ApiService) {}
  termNames: string[] = [];
  courses: string[] = [];
  terms: any = null;
  selectedTerm = '';
  selectedCourse = '';
  newGrade: Grade = {
    name: '',
    grade: 0,
    weight: 0
  };
  allGrades: Grade[] = [];
  data: Grade[] = [];
  displayedColumns: string[] = ['name', 'grade', 'weight'];
  ngOnInit() {
    this.api.getTerms().subscribe((data: any) => {
      this.terms = data;
      this.termNames = Object.keys(data);
    });
  }
  loadCourses() {
    this.courses = Object.keys(this.terms[this.selectedTerm].courses);
    console.log(this.courses);
  }
  loadGrades() {
    this.data = this.terms[this.selectedTerm].courses[this.selectedCourse];
    this.allGrades = this.data;
  }
  addGrade() {
    this.data.push(this.newGrade);
    this.allGrades = [...this.data];
  }
  clear() {
    this.selectedCourse = '';
    this.selectedTerm = '';
    this.newGrade = null;
  }
  submit() {
    this.terms[this.selectedTerm].courses[this.selectedCourse] = this.allGrades;
    console.log(this.terms);
    this.api.updateTerm(this.terms);
    this.clear();
  }
}
