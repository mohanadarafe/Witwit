import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private registerUrl = 'http://localhost:3002/routes/login_register/register';
  private loginUrl = 'http://localhost:3002/routes/login_register/login';
  private emailUrl = 'http://localhost:3002/routes/login_register/forgot';
  
  constructor(private http: HttpClient) {
  }
  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  emailUser(user) {
    return this.http.post<any>(this.emailUrl, user);
  }

 
}
