import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;//
  submitted = false;//
  logUser = {};

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]],
  })}

    //This function will call the validation to make sure all the fields are filled before sending it to the backend
    checkup() {
      this.submitted = true;
      if (this.loginForm.invalid) {

        return;
      }
      else {
          if( this.loginUser() != undefined){

          }
          else{
              alert("Either the username and/or password are wrong")
          }
      }
    }

  loginUser() {
    this.auth
      .loginUser(this.logUser)
      .subscribe(
        res => {
          console.log(res.token);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/timeline']);
        },
        err => console.log(err));
  }
  // convenience getter for easy access to form fields
  get g() { return this.loginForm.controls; }
}
