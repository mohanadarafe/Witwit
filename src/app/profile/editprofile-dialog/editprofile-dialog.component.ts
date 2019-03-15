import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ProfileService } from "../services/profile.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { MatDialogConfig } from "@angular/material";

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
    private formBuilder: FormBuilder,
     private profileService: ProfileService,
      private router: Router,
       private toaster: ToastrService,
        private dialog: MatDialog)
        {}

  ngOnInit() {
  //  this.sendUserToken();
    this.editProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      email: ['', Validators.required],
    }, {
    });
  }

  sendUserToken() {
    this.profileService.getUserToken().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error('error getting token', err);
      }
    );
  }

  get control() { return this.editProfileForm.controls; }

  // action when the submit button will be pressed
  // subscribe function
  // will send the data to the backend directly to the backend
  // with the help of the method registerUser we can send the data
  // and retrieve it with the .subscribe method
  changeInfo () {
    this.profileService.editProfile(this.user).subscribe(
      res => {console.log(res);
        this.dialogRef.close(); },
      err => {console.log(err), this.showError(err.error)},
      () => {console.log('The request has been completed, the information has been changed successfully!'),
      this.showSuccess(); } ,

    );
    }
    // display alerts
    showError(error: String ) {
      this.toaster.toastrConfig.toastClass = 'alert';
      this.toaster.toastrConfig.iconClasses.error = 'alert-danger';
      this.toaster.error(error + 'Please try again.');
    }

    showSuccess(){
      this.toaster.toastrConfig.toastClass = 'alert'
      this.toaster.toastrConfig.iconClasses.success = 'alert-success'
      this.toaster.success("the information has been changed successfully")
      }

      passwordDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '50%';
        this.dialog.open(PasswordDialogComponent,dialogConfig)
      }

  // close action for the dialog
  close() {
    this.dialogRef.close();
  }

}
