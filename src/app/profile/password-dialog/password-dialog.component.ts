import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import { ProfileService } from "../services/profile.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { faTimes } from "@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
faTimes = faTimes;
  userInfo = {};
  editPasswordForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<PasswordDialogComponent>,
     private formBuilder : FormBuilder,
       private router: Router,
        private toaster: ToastrService,
         private dialog : MatDialog,
          private profileService : ProfileService)  
          { }

  ngOnInit() {
    this.editPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    },{ 
      validator: MustMatch('password', 'confirmPassword')
  }
    )
   
  }

  get control() { return this.editPasswordForm.controls; }

  btnPressed(){
this.resetPassword();
  }

  resetPassword(){

    this.profileService.resetPassword(this.userInfo).subscribe(

      res => (console.log(res)),
      err => {console.log(err), this.showError(err.error)},
      () => {console.log("The request has been completed, your password has been changed successfully!"),this.showSuccess()},
    );
  }

    // display alerts 
    showError(error : String ){
      this.toaster.toastrConfig.toastClass = 'alert'
      this.toaster.toastrConfig.iconClasses.error = "alert-danger"
      this.toaster.error(error+". Please try again.")
    }
    // display a successful alert 
    showSuccess(){
      this.toaster.toastrConfig.toastClass = 'alert'
      this.toaster.toastrConfig.iconClasses.success = 'alert-success'
      this.toaster.success("your password has been changed successfully")
      }

  // close action for the dialog 
  close() {
    this.dialogRef.close();
  }
}
