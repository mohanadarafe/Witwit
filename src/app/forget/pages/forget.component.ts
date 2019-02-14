import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




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
  notMatch : boolean = false;
  count : number = 0;
  

  constructor(private formBuilder : FormBuilder,private auth: AuthService,
    private router: Router, private toaster: ToastrService) { }


 

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    else{
   this.requestPassword()
   
 

}
  }

 

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
      
    })
  }

  requestPassword() {
    this.auth.requestPassword(this.userEmail).subscribe(
      res => {console.log(res)},
      err => {console.log(err),this.showError()},
      () => {console.log("The request has been completed, the email has been sent without an issue."),this.showSuccess()},
      
    );
}

get f() {return this.messageForm.controls}

showSuccess(){
this.toaster.toastrConfig.toastClass = 'alert'
this.toaster.toastrConfig.iconClasses.success = 'alert-success'
this.toaster.success("An email has been sent to the supplied email address.")


}

showError(){
  this.toaster.toastrConfig.toastClass = 'alert'
  this.toaster.toastrConfig.iconClasses.error = "alert-danger"
  this.toaster.error("The supplied email address did not match our records. Please try again.")
}

}


