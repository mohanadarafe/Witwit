import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from 'src/app/_helpers/must-match.validator';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  selectedFile: ImageSnippet;
  registerForm: FormGroup;
  url;

  submitted = false;
  registeredUser = {};

  constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private router: Router ,
        private toaster: ToastrService,
        private http: HttpClient
        ) {}


  // To validate that the user had filled up the info to register
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



  // This function will call the validation to make sure all the fields are filled before sending it to the backend
  checkup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.register_User();
    }
  }
  // For sending the info of the user to the backend:
  register_User() {
    this.auth.registerUser(this.registeredUser).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/timeline']);
      },
      err => {
        console.log(err),
        this.showError(err.error);
      }
    );
  }


  // convenience getter for easy access to form fields
  get g() { return this.registerForm.controls; }

  showError(error: String ) {
    this.toaster.toastrConfig.toastClass = 'alert';
    this.toaster.toastrConfig.iconClasses.error = 'alert-danger';
    this.toaster.error(error + '. Please try again.');
  }

 // Uploading profile image
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      const READER = new FileReader();

      READER.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };
      READER.readAsDataURL(event.target.files[0]);
    }
  }
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
        }
      );
    });

    reader.readAsDataURL(file);
  }
}
class ImageSnippet {
  pending: Boolean = false;
  status: String = 'init';
  constructor(public src: string, public file: File) {}
}
