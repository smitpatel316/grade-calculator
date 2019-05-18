import { Component, OnInit } from '@angular/core';
import { auth } from '../auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private author: auth, private router: Router) {}

  ngOnInit() {}
  addStudyTerm() {
    this.router.navigate(['add-study-term']);
  }
  signOut() {
    this.author.setLoggedIn(false);
    this.router.navigate(['sign-in']);
  }
}
