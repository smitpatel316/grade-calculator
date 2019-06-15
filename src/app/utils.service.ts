import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}
  get listOfUniversities() {
    return [
      'University of Toronto',
      'McMaster University',
      'Brock University',
      'Ryerson University',
      'University of Ontario Institute of Technology',
      'University of Waterloo',
      'Western University',
      'Wilfrid Laurier University',
      'York University'
    ];
  }
  convertGradeToGpa(university, grade) {
    switch (university) {
      case 'University of Toronto':
        return this.UniversityOfToronto(grade);
      case 'York University':
        return this.York(grade);
      case 'McMaster University':
        return this.McMasterAndLaurier(grade);
      case 'Wilfrid Laurier University':
        return this.McMasterAndLaurier(grade);
      case 'Ryerson University':
        return this.RyersonAndUoit(grade);
      case 'University of Ontario Institute of Technology':
        return this.RyersonAndUoit(grade);
      case 'Brock University':
        return this.BrockAndWaterlooAndWestern(grade);
      case 'University of Waterloo':
        return this.BrockAndWaterlooAndWestern(grade);
      case 'Western University':
        return this.BrockAndWaterlooAndWestern(grade);
    }
  }
  UniversityOfToronto(grade: number) {
    switch (true) {
      case grade > 84:
        return [4.0, 4.0];
      case 80 <= grade && grade <= 84:
        return [3.7, 3.7];
      case 77 <= grade && grade <= 79:
        return [3.3, 3.3];
      case 73 <= grade && grade <= 76:
        return [3.0, 3.0];
      case 70 <= grade && grade <= 72:
        return [2.7, 2.7];
      case 67 <= grade && grade <= 69:
        return [2.3, 2.3];
      case 63 <= grade && grade <= 66:
        return [2.0, 2.0];
      case 60 <= grade && grade <= 62:
        return [1.7, 1.7];
      case 57 <= grade && grade <= 59:
        return [1.3, 1.3];
      case 53 <= grade && grade <= 56:
        return [1.0, 1.0];
      case 50 <= grade && grade <= 52:
        return [0.7, 0.7];
      case grade < 50:
        return [0, 0];
    }
  }
  York(grade: number) {
    switch (true) {
      case grade > 90:
        return [9, 4.0];
      case 80 <= grade && grade <= 89:
        return [8, 3.8];
      case 75 <= grade && grade <= 79:
        return [7, 3.3];
      case 70 <= grade && grade <= 74:
        return [6, 3.0];
      case 65 <= grade && grade <= 69:
        return [5, 2.3];
      case 60 <= grade && grade <= 64:
        return [4, 2.0];
      case 55 <= grade && grade <= 59:
        return [3, 1.3];
      case 50 <= grade && grade <= 54:
        return [2, 1.0];
      case 49 <= grade && grade <= 50:
        return [1, 0.7];
      case grade < 49:
        return [0, 0];
    }
  }
  McMasterAndLaurier(grade: number) {
    switch (true) {
      case grade > 90:
        return [12, 4.0];
      case 85 <= grade && grade <= 89:
        return [11, 3.9];
      case 80 <= grade && grade <= 84:
        return [10, 3.7];
      case 77 <= grade && grade <= 79:
        return [9, 3.3];
      case 73 <= grade && grade <= 76:
        return [8, 3.0];
      case 70 <= grade && grade <= 72:
        return [7, 2.7];
      case 67 <= grade && grade <= 69:
        return [6, 2.3];
      case 63 <= grade && grade <= 66:
        return [5, 2.0];
      case 60 <= grade && grade <= 62:
        return [4, 1.7];
      case 57 <= grade && grade <= 59:
        return [3, 1.3];
      case 53 <= grade && grade <= 56:
        return [2, 1.0];
      case 50 <= grade && grade <= 52:
        return [1, 0.7];
      case grade < 50:
        return [0, 0];
    }
  }
  BrockAndWaterlooAndWestern(grade: number) {
    switch (true) {
      case grade > 90:
        return [4.0, 4.0];
      case 85 <= grade && grade <= 89:
        return [3.9, 3.9];
      case 80 <= grade && grade <= 84:
        return [3.7, 3.7];
      case 77 <= grade && grade <= 79:
        return [3.3, 3.3];
      case 73 <= grade && grade <= 76:
        return [3.0, 3.0];
      case 70 <= grade && grade <= 72:
        return [2.7, 2.7];
      case 67 <= grade && grade <= 69:
        return [2.3, 2.3];
      case 63 <= grade && grade <= 66:
        return [2.0, 2.0];
      case 60 <= grade && grade <= 62:
        return [1.7, 1.7];
      case 57 <= grade && grade <= 59:
        return [1.3, 1.3];
      case 53 <= grade && grade <= 56:
        return [1.0, 1.0];
      case 50 <= grade && grade <= 52:
        return [0.7, 0.7];
      case grade < 50:
        return [0, 0];
    }
  }
  RyersonAndUoit(grade: number) {
    switch (true) {
      case grade > 90:
        return [4.33, 4.0];
      case 85 <= grade && grade <= 89:
        return [4.0, 3.9];
      case 80 <= grade && grade <= 84:
        return [3.67, 3.7];
      case 77 <= grade && grade <= 79:
        return [3.33, 3.3];
      case 73 <= grade && grade <= 76:
        return [3.0, 3.0];
      case 70 <= grade && grade <= 72:
        return [2.67, 2.7];
      case 67 <= grade && grade <= 69:
        return [2.33, 2.3];
      case 63 <= grade && grade <= 66:
        return [2.0, 2.0];
      case 60 <= grade && grade <= 62:
        return [1.67, 1.7];
      case 57 <= grade && grade <= 59:
        return [1.33, 1.3];
      case 53 <= grade && grade <= 56:
        return [1.0, 1.0];
      case 50 <= grade && grade <= 52:
        return [0.67, 0.7];
      case grade < 50:
        return [0, 0];
    }
  }
}
