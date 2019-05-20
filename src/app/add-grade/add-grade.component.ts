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
  newGrade = {
    name: '',
    grade: 0,
    weight: 0
  };
  ngOnInit() {
    this.api.getTerms().subscribe((data: any) => {
      this.terms = data;
      this.termNames = Object.keys(data);
    });
  }
  loadCourses() {
    this.courses = this.terms[this.selectedTerm].courses;
    console.log(this.courses);
  }
  addGrade() {
    console.log(this.newGrade);
  }
}
