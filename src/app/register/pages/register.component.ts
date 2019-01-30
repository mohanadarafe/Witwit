import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  registeredUser = {}; //I think this is Hampic's doing. A.J

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userAge: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  /**********************
   *  Alain Jobs
   **********************/
  //constructor(private auth: AuthService,
  // private router: Router) {} 

  //--> // Sorry Haboub, but multiple contructor init is not allowed. We will have to find a workaround. :S
  //A. J

  /*    
  registerUser() {
    this.registerForm = this.formBuilder.group({

    })
    this.auth.registerUser(this.registeredUser).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['\timeline']);
      },
      err => console.log(err)
    );
  }*/


  // convenience getter for easy access to form fields
  get g() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    //--> // stop here if form is invalid --> maybe starts from there to link to the database?
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value)) //Just to test!
  }
}
