import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logUser = {}
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  loginUser() {
    this.auth.loginUser(this.logUser)
      .subscribe(
      res => console.log(res),
      err => console.log(err)
      )
  }

}
