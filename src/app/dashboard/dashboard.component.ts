import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGradeComponent } from '../add-grade/add-grade.component';

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
    const dialogRef = this.dialog.open(AddGradeComponent, {
      data: {
        term: termName,
        course: courseName
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
