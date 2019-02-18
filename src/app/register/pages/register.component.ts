import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  registeredUser = {}; //I think this is Hampic's doing. A.J

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router , private toaster: ToastrService) { }

  
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

  showError(error : String ){
    this.toaster.toastrConfig.toastClass = 'alert'
    this.toaster.toastrConfig.iconClasses.error = "alert-danger"
    this.toaster.error(error+". Please try again.")
  }

  //Uploading profile image
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files[0]);
      
    }
  }
}
