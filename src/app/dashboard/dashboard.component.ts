import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGradeComponent } from '../add-grade/add-grade.component';
import { ApiService } from '../api.service';
import { UpdateStudyTermComponent } from '../update-study-term/update-study-term.component';
import { AddStudyTermComponent } from '../add-study-term/add-study-term.component';
import { AnalysisComponent } from '../analysis/analysis.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  terms: any[];
  termNames: string[] = [];
  courses: string[] = [];
  constructor(private api: ApiService, public dialog: MatDialog) {}

  async ngOnInit() {
    this.loadTerms();
  }
  async loadTerms() {
    await this.api.getTerms().subscribe((data: any) => {
      this.terms = data;
      this.termNames = Object.keys(data);
    });
  }

  generateCourses(termName: string): Array<any> {
    return Object.keys(this.terms[termName].courses);
  }
  addGrade(termName: string, courseName: string) {
    this.dialog.open(AddGradeComponent, {
      data: {
        term: termName,
        course: courseName
      }
    });
  }
  updateTerm(termName: string) {
    this.dialog.open(UpdateStudyTermComponent, {
      data: {
        term: termName
      }
    });
  }
  addTerm() {
    this.dialog.open(AddStudyTermComponent);
  }
  analysis(termName: string) {
    this.dialog.open(AnalysisComponent, {
      data: {
        term: termName,
        dialog: this.dialog
      }
    });
  }
  deleteTerm(termName: string) {
    this.api.deleteTerm(termName);
  }
}
