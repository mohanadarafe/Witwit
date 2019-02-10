import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private registerUrl = 'http://localhost:3002/routes/login_register/register';
  private loginUrl = 'http://localhost:3002/routes/login_register/login';
  private emailUrl = 'http://localhost:3002/routes/login_register/forgot';
  
  constructor(private http: HttpClient, private _router: Router) {
  }
  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  loginUser(user) {
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
 
}
