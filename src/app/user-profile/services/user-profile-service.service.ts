import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {
  private userLoggedInURL     = 'http://localhost:3002/routes/userProfile/userLoggedIn';
  private userInfoURL         = 'http://localhost:3002/routes/userProfile/userInfo';
  private userWitsURL         = 'http://localhost:3002/routes/userProfile/wits';
  private getListFollowingURL = 'http://localhost:3002/routes/userProfile/getListFollowing';
  private getListFollowersURL = 'http://localhost:3002/routes/userProfile/getListFollowers';
  private postReplyURL        = 'http://localhost:3002/routes/userProfile/postReply';
  private likeWitURL          = 'http://localhost:3002/routes/userProfile/like';
  private unlikeWitURL        = 'http://localhost:3002/routes/userPorfile/unlike';
  private getLikedWitsURL     = 'http://localhost:3002/routes/userProfile/likedWits';
  private likesListURL        = 'http://localhost:3002/routes/timeline/likesList';

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

  getFollowingList(user) {
    return this.http.post<any>(this.getListFollowingURL, user);
  }

  getFollowerList(user) {
    return this.http.post<any>(this.getListFollowersURL, user);
  }

  postReply(reply) {
    return this.http.post<any>(this.postReplyURL, reply);
  }

  likeWit(likeObject) {
    return this.http.post<any>(this.likeWitURL, likeObject);
  }

  unlikeWit(unlikeObject) {
    return this.http.post<any>(this.unlikeWitURL, unlikeObject);
  }

  getlikedWits(user) {
    return this.http.post<any>(this.getLikedWitsURL, user);
  }

  getLikesList (id: Object) {
    return this.http.post<any>(this.likesListURL, id);
  }


}
