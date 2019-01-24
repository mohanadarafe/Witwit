import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeredUser = {}
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.registeredUser)
      .subscribe(
      res => console.log(res),
      err => console.log(err)
      )
  }
}
