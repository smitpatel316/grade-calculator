import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<PredictionComponent>,
    @Inject(MAT_DIALOG_DATA) public passedOnInformation
  ) {}
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
  weightLeft = 100;
  ngOnInit() {
    this.api.getTerms().subscribe((data: any) => {
      this.terms = data;
      this.termNames = Object.keys(data);
      this.selectedTerm = this.passedOnInformation.term;
      this.loadCourses();
    });
  }
  loadCourses() {
    this.courses = Object.keys(this.terms[this.selectedTerm].courses);
    this.selectedCourse = '';
    this.gradeNeeded = null;
  }
  loadGrades() {
    this.data = this.terms[this.selectedTerm].courses[this.selectedCourse];
    this.allGrades = this.data;
    this.gradeNeeded = null;
  }
  calculate() {
    if (this.gradeWanted !== null) {
      let currentGrades = this.gradeWanted;
      let weights = 1;
      this.weightLeft = 100;
      this.allGrades.forEach(element => {
        currentGrades -= Number(element.grade) * (Number(element.weight) / 100);
        weights -= Number(element.weight) / 100;
        this.weightLeft -= Number(element.weight);
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
