import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private followUserURL = 'http://localhost:3002/routes/follow/followUser';

  constructor(private http: HttpClient) { }

  followUser(name: Object) {
    return this.http.post<any>(this.followUserURL, name);
  }
}
