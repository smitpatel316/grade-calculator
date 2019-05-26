import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
export interface Grade {
  name: string;
  grade: number;
  weight: number;
}
@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  constructor(private api: ApiService) {}
  allGrades: Grade[] = [];
  data: Grade[] = [];
  displayedColumns: string[] = ['name', 'grade', 'weight'];
  termNames: string[] = [];
  courses: string[] = [];
  terms: any = null;
  selectedTerm = '';
  selectedCourse = '';
  gradeNeeded: number = null;
  gradeWanted: number = null;
  ngOnInit() {
    this.api.getTerms().subscribe((data: any) => {
      this.terms = data;
      this.termNames = Object.keys(data);
    });
  }
  loadCourses() {
    this.courses = Object.keys(this.terms[this.selectedTerm].courses);
  }
  loadGrades() {
    this.data = this.terms[this.selectedTerm].courses[this.selectedCourse];
    this.allGrades = this.data;
  }
  calculate() {
    if (this.gradeWanted !== null) {
      let currentGrades = this.gradeWanted;
      let weights = 1;
      this.allGrades.forEach(element => {
        currentGrades -= Number(element.grade) * (Number(element.weight) / 100);
        weights -= Number(element.weight) / 100;
      });
      this.gradeNeeded = Math.round((currentGrades / weights) * 100) / 100;
    }
  }
  clear() {
    this.selectedCourse = '';
    this.selectedTerm = '';
    this.gradeNeeded = null;
  }
}
