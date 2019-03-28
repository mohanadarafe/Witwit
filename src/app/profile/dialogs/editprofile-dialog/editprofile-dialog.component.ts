import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { MatDialogConfig } from '@angular/material';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-editprofile-dialog',
  templateUrl: './editprofile-dialog.component.html',
  styleUrls: ['./editprofile-dialog.component.css']
})

export class EditprofileDialogComponent implements OnInit {
  userData: any;
  editProfileForm: FormGroup;

  submitted = false;
  user      = {};

  faTimes = faTimes;

  constructor(
    private dialogRef: MatDialogRef<EditprofileDialogComponent>,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        age: ['', Validators.required],
        email: ['', Validators.required]
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
        console.error('error getting token', err);
      }
    );
  }

  get control() {
    return this.editProfileForm.controls;
  }

  // edit profile method
  changeInfo(user) {
    this.editUsername(user);
    this.editAge(user);
    this.editEmail(user);
  }

  // username edit request
  editUsername(user) {
    this.profileService.editUsername(user).subscribe(
      res => {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        this.sendUserToken();
        this.dialogRef.close();
      },
      err => {
        console.error(err), this.showError(err.error);
      },
      () => {
        console.log('The request has been completed, the information has been changed successfully!'),
        this.showSuccess();
      }
    );
  }
  // age edit request
  editAge(user) {
    this.profileService.editAge(user).subscribe(
      res => {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token)
        this.sendUserToken();
        this.dialogRef.close();
      },
      err => {
        console.error(err), this.showError(err.error);
      },
      () => {
        console.log('The request has been completed, the information has been changed successfully!'),
        this.showSuccess();
      }
    );
  }

  // email edit request
  editEmail(user) {
    this.profileService.editEmail(user).subscribe(
      res => {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token)
        this.sendUserToken();
        this.dialogRef.close();
      },
      err => {
        console.error(err), this.showError(err.error);
      },
      () => {
        console.log('The request has been completed, the information has been changed successfully!'),
        this.showSuccess();
      }
    );
  }

  // display error alerts
  showError(error: String) {
    this.toaster.toastrConfig.toastClass = 'alert';
    this.toaster.toastrConfig.iconClasses.error = 'alert-danger';
    this.toaster.error(error + 'Please try again.');

  }
  // display success alerts
  showSuccess() {
    this.toaster.toastrConfig.toastClass = 'alert';
    this.toaster.toastrConfig.iconClasses.success = 'alert-success';
    this.toaster.success('The information has been changed successfully');
  }

  // open the reset password dialog
  passwordDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    this.dialog.open(PasswordDialogComponent, dialogConfig);
  }

  // close action for the dialog
  close() {
    this.dialogRef.close();
  }
}
