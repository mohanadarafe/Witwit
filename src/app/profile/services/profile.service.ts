import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // User:
  private userTokenURL = ' http://localhost:3002/routes/main_pages/profile/User';
  // Main page:
  private profileURL = 'http://localhost:3002/routes/main_pages/profile/profile';

  // Edit profile
  private editUsernameURL = 'http://localhost:3002/routes/main_pages/profile/editUsername';
  private editEmailURL = 'http://localhost:3002/routes/main_pages/profile/editEmail';
  private editAgeURL = 'http://localhost:3002/routes/main_pages/profile/editAge';
  private resetPasswordURL = 'http://localhost:3002/routes/main_pages/profile/resetPassword';

  // Wits:
  private likedWitsListURL = 'http://localhost:3002/routes/main_pages/profile/likedWitsTab';
  private witLikesListURL = 'http://localhost:3002/routes/like/likeList/witLikesList';
  private deleteWitURL = 'http://localhost:3002/routes/postWit_postReply/delete/deleteWit';
  private likedWitsURL = 'http://localhost:3002/routes/like/likeCheck/likedWits';

  // Getting lists
  private getListFollowingURL = 'http://localhost:3002/routes/follow/followingList/getMyListFollowing';
  private getListFollowersURL = 'http://localhost:3002/routes/follow/followerList/getListMyFollowers';
  private getReplyLikesListURL = 'http://localhost:3002/routes/like/likeList/replyLikesList';


  constructor(private http: HttpClient) { }

  getFollowingList() {
    const token = { token: localStorage.getItem('token') };
    return this.http.post<any>(this.getListFollowingURL, token);
  }
  getFollowerList() {
    const token = { token: localStorage.getItem('token') };
    return this.http.post<any>(this.getListFollowersURL, token);
  }
  getlikedWits(user) {
    return this.http.post<any>(this.likedWitsURL, user);
  }
  requestUserWits() {
    const token = { token: localStorage.getItem('token') };
    return this.http.post<any>(this.profileURL, token);
  }
  getLikedWitList(userToken) {
    return this.http.post<any>(this.likedWitsListURL, userToken);
  }

  getLikesList(id: Object) {
    return this.http.post<any>(this.witLikesListURL, id);
  }

  deleteWit(wit) {
    return this.http.post<any>(this.deleteWitURL, wit);
  }

  editUsername(user) {
    return this.http.post<any>(this.editUsernameURL, user);
  }

  editEmail(user) {
    return this.http.post<any>(this.editEmailURL, user);
  }

  editAge(user) {
    return this.http.post<any>(this.editAgeURL, user);
  }

  resetPassword(user) {
    return this.http.post<any>(this.resetPasswordURL, user);
  }
  getUserToken() {
    const token = { token: localStorage.getItem('token') };
    return this.http.post<any>(this.userTokenURL, token);
  }
  getReplyLikesList(id: Object) {
    return this.http.post<any>(this.getReplyLikesListURL, id);
  }

}
