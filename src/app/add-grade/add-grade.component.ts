import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private api: ApiService, private snackBar: MatSnackBar) {}
  termNames: string[] = [];
  courses: string[] = [];
  terms: any = null;
  selectedTerm = '';
  selectedCourse = '';
  newGrade: Grade = {
    name: '',
    grade: 0,
    weight: 1
  };
  allGrades: Grade[] = [];
  data: Grade[] = [];
  displayedColumns: string[] = ['delete', 'name', 'grade', 'weight'];
  ngOnInit() {
    this.api.getTerms().subscribe((data: any) => {
      this.terms = data;
      this.termNames = Object.keys(data);
    });
  }
  loadCourses() {
    this.courses = Object.keys(this.terms[this.selectedTerm].courses);
    this.selectedCourse = '';
  }
  loadGrades() {
    this.data = this.terms[this.selectedTerm].courses[this.selectedCourse];
    this.allGrades = this.data;
  }
  async addGrade() {
    if (this.newGrade.name !== '') {
      let totalWeight = 0;
      let flag = false;
      await this.data.forEach(element => {
        if (element.name === this.newGrade.name) {
          this.showMessage('Item with same name exists.');
          flag = true;
        }
        totalWeight += Number(element.weight);
      });
      if (Number(this.newGrade.weight) + totalWeight > 100) {
        this.showMessage('Total Weight exceeds 100');
        flag = true;
      }
      if (!flag) {
        this.data.push(this.newGrade);
        this.allGrades = [...this.data];
        this.newGrade = {
          name: '',
          grade: 0,
          weight: 1
        };
      }
    }
  }
  clear() {
    this.selectedCourse = '';
    this.selectedTerm = '';
    this.newGrade = {
      name: '',
      grade: 0,
      weight: 1
    };
  }
  submit() {
    this.terms[this.selectedTerm].courses[this.selectedCourse] = this.allGrades;
    this.api.updateTerm(this.terms);
    this.clear();
  }
  deleteGrade(element) {
    const index = this.data.indexOf(element, 0);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    this.allGrades = [...this.data];
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
