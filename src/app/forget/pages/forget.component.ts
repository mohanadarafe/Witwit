import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  userEmail = {};
  messageForm: FormGroup;
  submitted = false;
  success = false;

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }
    else{
this.requestPassword()
}
  }

  constructor(private formBuilder : FormBuilder,private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
      
    })
  }


  requestPassword() {
    this.auth.requestPassword(this.userEmail).subscribe(
      res => console.log(res),
      err => console.log(err)//log them for now
    )
}

get f() {return this.messageForm.controls}  


}
