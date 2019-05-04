import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
  }
  addStudyTerm() {
    this.router.navigate(['add-study-term']);
  }
  signOut() {
    sessionStorage.clear();
    this.router.navigate(['sign-in']);
  }
}
