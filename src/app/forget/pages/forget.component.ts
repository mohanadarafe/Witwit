import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  email = {};

  constructor(private auth: AuthService,
    private router: Router) {}

  ngOnInit() {}

//forgetUser() {}

  requestPassword() {
    this.auth.requestPassword(this.auth).subscribe(
      res => console.log(res),
      err => console.log(err)//log them for now
    )
  }

  // onSubmit() {}

}
