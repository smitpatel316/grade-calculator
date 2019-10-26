import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material/dialog';
import { WeightedGradeComponent } from './weighted-grade/weighted-grade.component';
import { PredictionComponent } from './prediction/prediction.component';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AnalysisComponent>,
    @Inject(MAT_DIALOG_DATA) public passedOnInformation
  ) {}
  termName: string;
  dialog: MatDialog;
  ngOnInit() {
    this.termName = this.passedOnInformation.term;
    this.dialog = this.passedOnInformation.dialog;
  }
  weightedGrade() {
    this.dialogRef.close();
    this.dialog.open(WeightedGradeComponent, {
      data: {
        term: this.termName
      }
    });
  }
  prediction() {
    this.dialogRef.close();
    this.dialog.open(PredictionComponent, {
      data: {
        term: this.termName
      }
    });
  }
}
