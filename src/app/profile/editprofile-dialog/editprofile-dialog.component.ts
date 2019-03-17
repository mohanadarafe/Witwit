import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ProfileService } from "../services/profile.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { TimelineService } from '../../timeline/services/timeline.service';
import { MatDialogConfig } from "@angular/material";
import { DialogLikesComponent } from 'src/app/timeline/dialog-replies/dialog-likes/dialog-likes.component';


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
  userData :any;


  constructor(private dialogRef: MatDialogRef<EditprofileDialogComponent>, 
    private formBuilder: FormBuilder,
     private profileService : ProfileService,
      private router: Router,
       private toaster: ToastrService,
<<<<<<< Updated upstream
        private dialog : MatDialog) 
=======
        private dialog: MatDialog,
        private timelineService: TimelineService)
>>>>>>> Stashed changes
        {}

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      email: ['', Validators.required],
    },{
    })
  }

  get control() { return this.editProfileForm.controls; }

  // action when the submit button will be pressed 
  btnPressed(){
this.changeInfo();
  }

<<<<<<< Updated upstream
  // subscribe function 
  changeInfo (){
    // will send the data to the backend directly to the backend 
    // with the help of the method registerUser we can send the data 
    // and retrieve it with the .subscribe method

    this.profileService.editProfile(this.user).subscribe(
      //the .subscribe method will allow us to get a response from the backend
      //it can be errors or data that we need to pass to the frontend(UI)
      res => (console.log(res)),
      err => {console.log(err), this.showError(err.error)},
      () => {console.log("The request has been completed, the information has been changed successfully!"),this.showSuccess()},
  
    );
    }
    // display alerts 
    showError(error : String ){
      this.toaster.toastrConfig.toastClass = 'alert'
      this.toaster.toastrConfig.iconClasses.error = "alert-danger"
      this.toaster.error(error+". Please try again.")
=======

  get control() { return this.editProfileForm.controls; }

  // action when the submit button will be pressed
  // subscribe function
  // will send the data to the backend directly to the backend
  // with the help of the method registerUser we can send the data
  // and retrieve it with the .subscribe method
  changeInfo (user) {
    this.profileService.editProfile(user).subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
        this.sendUserToken();
        this.dialogRef.close();
        //this.router.navigate(['/profile']);
      
      
         },
      err => {console.error(err), this.showError(err.error)},
      () => {console.log('The request has been completed, the information has been changed successfully!'),
      this.showSuccess(); } ,

    );
    }

    // retrieveChangedInfo(){
    //   this.profileService.getChangedProfile().subscribe(
    //     res => {  
    //       this.userData.username = res;

    //     },
    //     err => {console.error(err), this.showError(err.error)},
    //   );

    // }
    // display alerts
    showError(error: String ) {
      this.toaster.toastrConfig.toastClass = 'alert';
      this.toaster.toastrConfig.iconClasses.error = 'alert-danger';
      this.toaster.error(error + 'Please try again.');
>>>>>>> Stashed changes
    }

    showSuccess(){
      this.toaster.toastrConfig.toastClass = 'alert'
      this.toaster.toastrConfig.iconClasses.success = 'alert-success'
      this.toaster.success("the information has been changed successfully")
      }

      passwordDialog(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "50%";
        this.dialog.open(PasswordDialogComponent,dialogConfig)
      }
  
  // close action for the dialog 
  close() {

    this.dialogRef.close();
  }

}
