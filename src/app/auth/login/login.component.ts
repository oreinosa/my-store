import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from './../../shared/models/login.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = new Login();
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onGoogleLogin() {
    try {
      await this.auth.googleSignin();
      // this.router.navigate(['/']);
    } catch (e) {
      console.log(e);
    }
  }

  async onEmailSignin(login: Login) {
    const { email, password } = login;
    try {
      await this.auth.emailSignin(email, password);
    } catch (e) {
      console.log(e);
    }
  }

}