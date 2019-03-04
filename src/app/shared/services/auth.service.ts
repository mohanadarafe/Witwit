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
  private userSearchUrl = 'http://localhost:3002/routes/searchEngine/search';
  private userTokenURL = 'http://localhost:3002/routes/timelineProfile/timelineProfile';
  private followingListURL = 'http://localhost:3002/routes/followUser/followingList';


  constructor(private http: HttpClient, private _router: Router) {
  }
  getFollowingList() {
    return this.http.get<any>(this.followingListURL);
  }
  requestUserData () {
    var token = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.userTokenURL, token);
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

  requestUsers(user) {
    return this.http.post<any>(this.userSearchUrl, user);
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
