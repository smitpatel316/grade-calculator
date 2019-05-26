import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from '../auth.guard';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  token = '';
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {}
  signUp() {
    this.router.navigate(['sign-up']);
  }
  async signIn() {
    this.api.signIn(this.username, this.password);
  }
}
