import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logUser = {};

  constructor(private auth: AuthService,
    private router: Router) {}

  ngOnInit() {}

  loginUser() {
    this.auth
      .loginUser(this.logUser)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/timeline']);
        },
        err => console.log(err));
  }
}
