import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {
  private userLoggedInURL     = 'http://localhost:3002/routes/userProfile/userLoggedIn';
  private userInfoURL         = 'http://localhost:3002/routes/userProfile/userInfo';
  private userWitsURL         = 'http://localhost:3002/routes/userProfile/wits';
  private getLikedListURL     = 'http://localhost:3002/routes/userProfile/likedWits';
  private getListFollowingURL = 'http://localhost:3002/routes/userProfile/getListFollowing';
  private getListFollowersURL = 'http://localhost:3002/routes/userProfile/getListFollowers';

  constructor(private http: HttpClient) { }

  requestUserLoggedIn() {
      let user = { token: localStorage.getItem('token')};
      return this.http.post<any>(this.userLoggedInURL, user);
  }

  getUserInfo(username) {
    return this.http.post<any>(this.userInfoURL, username);
  }

  getWits(user) {
    return this.http.post<any>(this.userWitsURL, user);
  }

  getLikesList(id: Object) {
    return this.http.post<any>(this.getLikedListURL, id);
  }

  getFollowingList(user) {
    return this.http.post<any>(this.getListFollowingURL, user);
  }

  getFollowerList(user) {
    return this.http.post<any>(this.getListFollowersURL, user);
  }
}
