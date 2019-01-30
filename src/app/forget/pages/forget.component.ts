import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
>>>>>>> forget-my-password

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  registeredUser = {};

<<<<<<< HEAD
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) { 
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],

    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;
  }
=======
  constructor(private auth: AuthService,
    private router: Router) {}

  ngOnInit() {}

//forgetUser() {}

  emailUser(){
    this.auth.registerUser(this.emailUser).subscribe(
      res => {
        localStorage.setItem('token', res.token);
      },
      err => console.log(err)
);
  }

  submitPressed(){
>>>>>>> forget-my-password

  }

  // onSubmit() {}

}
