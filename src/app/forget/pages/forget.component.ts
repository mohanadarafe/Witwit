import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  registeredUser = {};
  constructor(private auth: AuthService,
    private router: Router) {}

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.registeredUser).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['\timeline']);
      },
      err => console.log(err)
    );
  }

}
