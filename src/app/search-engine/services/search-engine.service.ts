import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  private followUserURL = 'http://localhost:3002/routes/follow/followUser/followUser';
  private sendTokenURL = 'http://localhost:3002/routes/main_pages/searchEngine/currentUser';
  private userSearchUrl = 'http://localhost:3002/routes/main_pages/searchEngine/search';

  constructor(private http: HttpClient) { }

  followUser(name: Object) {
    return this.http.post<any>(this.followUserURL, name);
  }

  getUserToken () {
    const token = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.sendTokenURL, token);
  }

  requestUser(user) {
    return this.http.post<any>(this.userSearchUrl, user);
  }
}
