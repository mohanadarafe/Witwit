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

  constructor(private formBuilder : FormBuilder,private auth: AuthService,
    private router: Router, private toaster: ToastrService) { }

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    else{
      this.sentAlert()
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
      res => console.log(res),
      err => console.log(err)//log them for now
    )
   
}

get f() {return this.messageForm.controls}

sentAlert(){
this.toaster.success("An email has been sent.", "Success")
}

}


