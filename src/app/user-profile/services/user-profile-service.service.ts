import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {
  private timelineProfileURL = ''

  constructor(private http: HttpClient) { }

  requestUserData(user) {
      return this.http.post<any>(this.timelineProfileURL, user);
  }
}
