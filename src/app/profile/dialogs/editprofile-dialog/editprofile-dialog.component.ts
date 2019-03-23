import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PasswordDialogComponent } from "../password-dialog/password-dialog.component";
import { MatDialogConfig } from "@angular/material";
import { ProfileService } from "../../services/profile.service";

@Component({
  selector: "app-editprofile-dialog",
  templateUrl: "./editprofile-dialog.component.html",
  styleUrls: ["./editprofile-dialog.component.css"]
})
export class EditprofileDialogComponent implements OnInit {
  faTimes = faTimes;
  editProfileForm: FormGroup;
  submitted = false;
  user = {};
  userData: any;

  constructor(
    private dialogRef: MatDialogRef<EditprofileDialogComponent>,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    //  this.sendUserToken();
    this.editProfileForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        age: ["", Validators.required],
        email: ["", Validators.required]
      },
      {}
    );
  }

  sendUserToken() {
    this.profileService.getUserToken().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error("error getting token", err);
      }
    );
  }

  get control() {
    return this.editProfileForm.controls;
  }

  // action when the submit button will be pressed
  // subscribe function
  // will send the data to the back-end directly to the back-end
  // with the help of the method registerUser we can send the data
  // and retrieve it with the .subscribe method
  changeInfo(user) {
    this.editUsername(user)
    this.editAge(user)
    this.editEmail(user)
  }
  editUsername(user) {
    // username edit request  
    this.profileService.editUsername(user).subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token)
        this.sendUserToken();
        this.dialogRef.close();
      },
      err => {
        console.error(err), this.showError(err.error);
      },
      () => {
        console.log(
          "The request has been completed, the information has been changed successfully!"
        ),
          this.showSuccess();
      }
    );
  }
  editAge(user) {
    // age edit request

    this.profileService.editAge(user).subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token)
        this.sendUserToken();
        this.dialogRef.close();
      },
      err => {
        console.error(err), this.showError(err.error);
      },
      () => {
        console.log(
          "The request has been completed, the information has been changed successfully!"
        ),
          this.showSuccess();
      }
    );
  }

  editEmail(user) {
    // email edit request 
    this.profileService.editEmail(user).subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token)
        this.sendUserToken();
        this.dialogRef.close();
      },
      err => {
        console.error(err), this.showError(err.error);
      },
      () => {
        console.log(
          "The request has been completed, the information has been changed successfully!"
        ),
          this.showSuccess();
      }
    );

  }

  // display alerts
  showError(error: String) {
    this.toaster.toastrConfig.toastClass = "alert";
    this.toaster.toastrConfig.iconClasses.error = "alert-danger";
    this.toaster.error(error + "Please try again.");
  }

  showSuccess() {
    this.toaster.toastrConfig.toastClass = "alert";
    this.toaster.toastrConfig.iconClasses.success = "alert-success";
    this.toaster.success("The information has been changed successfully");
  }

  passwordDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
    this.dialog.open(PasswordDialogComponent, dialogConfig);
  }

  // close action for the dialog
  close() {
    this.dialogRef.close();
  }
}
