import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import {saveAs} from 'file-saver';
import { HttpClient } from '@angular/common/http';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from 'src/app/_helpers/must-match.validator';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
// tslint:disable-next-line:component-class-suffix


export class RegisterComponent implements OnInit {
  // uploader: FileUploader = new FileUploader({url: uploadFileURL});
  // attachmentList: any = [];
  selectedFile: ImageSnippet;
  registerForm: FormGroup;
  url;
  submitted = false;
  registeredUser = {};

  constructor(private formBuilder: FormBuilder,
        private auth: AuthService,
        private router: Router ,
        private toaster: ToastrService,
        private http: HttpClient
        ) {
          // this.uploader.onCompleteItem = (item: any, response: any , status: any, headers: any) => {
          //   item.withCredentials = false;
          //   this.attachmentList.push(JSON.parse(response));

         }


  //To check if the 'password' and 'confirm password' are the same
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userAge: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }



  //This function will call the validation to make sure all the fields are filled before sending it to the backend
  checkup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }//if all the fields are okay then send to the backend through registerUser()
    else {
      this.register_User();
    }
  }

  register_User() {

    //we call the registerUser method in the shared/services/auth.service.ts passing the user data
    //as argument. This method will be responsible of sending those data to the backend directly.
    this.auth.registerUser(this.registeredUser).subscribe(
      //the .subscribe method will allow us to get a response from the backend
      //it can be errors or data that we need to pass to the frontend(UI)
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/timeline']);
      },
      err => {console.log(err), this.showError(err.error)}
    );
  }


  // convenience getter for easy access to form fields
  get g() { return this.registerForm.controls; }

  showError(error: String ) {
    this.toaster.toastrConfig.toastClass = 'alert';
    this.toaster.toastrConfig.iconClasses.error = 'alert-danger';
    this.toaster.error(error+". Please try again.")
  }

  // Uploading profile image
  // readUrl(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = (event: ProgressEvent) => {
  //       this.url = (<FileReader>event.target).result;
  //     }

  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.auth.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }
}
class ImageSnippet {
  pending: Boolean = false;
  status: String = 'init';
  constructor(public src: string, public file: File) {}
}
