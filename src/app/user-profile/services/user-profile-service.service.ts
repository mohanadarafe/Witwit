import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {

  // Not useful:
  private userLoggedInURL     = 'http://localhost:3002/routes/main_pages/userProfile/userLoggedIn';

  // userProfile main page:
  private userInfoURL         = 'http://localhost:3002/routes/main_pages/userProfile/userInfo';
  private userWitsURL         = 'http://localhost:3002/routes/main_pages/userProfile/wits';
  private getLikedWitsURL     = 'http://localhost:3002/routes/main_pages/userProfile/likedWits';

  // Replies:
  private replyPostURL        = 'http://localhost:3002/routes/postWit_postReply/post/postReply';

  // Likes:
  private likeWitURL          = 'http://localhost:3002/routes/like/likeWit/likeWit';
  private unlikeWitURL        = 'http://localhost:3002/routes/like/likeWit/unlikeWit';
  private witLikesListURL     = 'http://localhost:3002/routes/like/likeList/witLikesList';

  // Follow lists:
  private getListFollowingURL = 'http://localhost:3002/routes/follow/followingList/getListFollowing';
  private getListFollowersURL = 'http://localhost:3002/routes/follow/followerList/getListFollowers';



  constructor(private http: HttpClient) { }

  requestUserLoggedIn() {
      const user = { token: localStorage.getItem('token')};
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
    return this.http.post<any>(this.replyPostURL, reply);
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

  getWitLikesList (id: Object) {
    return this.http.post<any>(this.witLikesListURL, id);
  }


}
