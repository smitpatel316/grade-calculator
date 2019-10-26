import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { UtilsService } from 'src/app/utils.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface Grade {
  name: string;
  grade: number;
  weight: number;
}
@Component({
  selector: 'app-weighted-grade',
  templateUrl: './weighted-grade.component.html',
  styleUrls: ['./weighted-grade.component.css']
})
export class WeightedGradeComponent implements OnInit {
  constructor(
    private api: ApiService,
    private util: UtilsService,
    public dialogRef: MatDialogRef<WeightedGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public passedOnInformation
  ) {
    this.ngOnInit();
    this.data;
  }
  allGrades: Grade[] = [];
  data: Grade[] = [];
  displayedColumns: string[] = ['name', 'grade', 'weight'];
  termNames: string[] = [];
  courses: string[] = [];
  terms: any = null;
  selectedTerm = '';
  selectedCourse = '';
  weightedGrade: number = null;
  gpa: number[] = null;
  ngOnInit() {
    this.api.getTerms().subscribe((data: any) => {
      this.terms = data;
      this.termNames = Object.keys(data);
      this.selectedTerm = this.passedOnInformation.term;
      this.loadCourses();
    });
  }
  loadCourses() {
    if (this.selectedTerm != null && this.terms != null) {
      this.courses = Object.keys(this.terms[this.selectedTerm].courses);
      this.selectedCourse = '';
      this.weightedGrade = null;
      this.gpa = null;
    }
  }
  loadGrades() {
    this.data = this.terms[this.selectedTerm].courses[this.selectedCourse];
    this.allGrades = this.data;
    this.weightedGrade = null;
    this.gpa = null;
  }
  calculate() {
    let numer = 0;
    let denom = 0;
    this.allGrades.forEach(element => {
      numer += Number(element.grade) * (Number(element.weight) / 100);
      denom += Number(element.weight) / 100;
    });
    if (denom !== 0) {
      this.weightedGrade = Math.round((numer / denom) * 100) / 100;
      if (this.terms[this.selectedTerm].university && this.weightedGrade) {
        this.gpa = this.util.convertGradeToGpa(
          this.terms[this.selectedTerm].university,
          this.weightedGrade
        );
      }
    }
  }
  clear() {
    this.selectedCourse = '';
    this.selectedTerm = '';
    this.weightedGrade = null;
  }
}
