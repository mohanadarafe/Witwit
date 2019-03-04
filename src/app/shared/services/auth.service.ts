import { Injectable } from '@angular/core';
//for the http request we need to import that module
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

//contains the method related to login and registration
export class AuthService {

  //backend API URLs
  private registerUrl = 'http://localhost:3002/routes/login_register/register';
  private loginUrl = 'http://localhost:3002/routes/login_register/login';
  private emailUrl = 'http://localhost:3002/routes/login_register/forgot';
  
  constructor(private http: HttpClient, private _router: Router) {
  }
  
  //object :'user' contains [username, password, email, age]
  registerUser(user) {
    //http request
    return this.http.post<any>(this.registerUrl, user);
  }

  //object :'user' contains [username, password]
  loginUser(user) {
    //http request
    return this.http.post<any>(this.loginUrl, user);
  }

  requestPassword(user) {
    return this.http.post<any>(this.emailUrl, user);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }
 
}
