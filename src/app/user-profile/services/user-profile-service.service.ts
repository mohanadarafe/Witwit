import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {
  private UserLoggedInURL = 'http://localhost:3002/routes/userProfile/userLoggedIn';

  constructor(private http: HttpClient) { }

  requestUserLoggedIn() {
      let user = { token: localStorage.getItem('token')};
      return this.http.post<any>(this.UserLoggedInURL, user);
  }
}
