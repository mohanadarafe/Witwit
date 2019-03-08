import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
//import { TimelineService } from "../../services/timeline.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editprofile-dialog',
  templateUrl: './editprofile-dialog.component.html',
  styleUrls: ['./editprofile-dialog.component.css']
})
export class EditprofileDialogComponent implements OnInit {

  faTimes = faTimes;
  editProfileForm: FormGroup;
  submitted = false;
  user = {};

  constructor(private dialogRef: MatDialogRef<EditprofileDialogComponent>, 
    private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private toaster: ToastrService) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      //password: ['', [Validators.required, Validators.minLength(6)]],
      //confirmPassword: ['', Validators.required],
    },{
      //validator: MustMatch('password', 'confirmPassword')
    })
  }

  get control() { return this.editProfileForm.controls; }

  // action when the submit button will be pressed 
  btnPressed(){
this.changeInfo();
  }

  // subscribe function 
  changeInfo (){
    // will send the data to the backend directly to the backend 
    // with the help of the method registerUser we can send the data 
    // and retrieve it with the .subscribe method

    this.auth.registerUser(this.user).subscribe(
      //the .subscribe method will allow us to get a response from the backend
      //it can be errors or data that we need to pass to the frontend(UI)
      res => (console.log(res)),
      err => {console.log(err), this.showError(err.error)}
  
    );
    }
    // display alerts 
    showError(error : String ){
      this.toaster.toastrConfig.toastClass = 'alert'
      this.toaster.toastrConfig.iconClasses.error = "alert-danger"
      this.toaster.error(error+". Please try again.")
    }
  
  // close action for the dialog 
  close() {
    this.dialogRef.close();
  }

}
