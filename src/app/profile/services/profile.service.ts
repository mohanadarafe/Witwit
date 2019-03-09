import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileURL = 'http://localhost:3002/routes/profile/profile';
  private likedListURL = 'http://localhost:3002/routes/timeline/likesList';
  private deleteWitURL = 'http://localhost:3002/routes/profile/deleteWit';
  private listFollowingURL = 'http://localhost:3002/routes/profile/getListFollowing';
  private listFollowingOfFollowingURL = 'http://localhost:3002/routes/profile//getListFollowingOfFollowing';
  private editProfileURL = 'http://localhost:3002/routes/login_register/editProfile';

  constructor(private http: HttpClient) { }
  getFollowingOfFollowing(following){
    return this.http.post<any>(this.listFollowingOfFollowingURL, following)
  }
  getFollowingList(){
    var token = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.listFollowingURL,token);
  }
  requestUserWits (){
    var token = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.profileURL,token);
  }

  // Get the information from the user (http.get) add this later
  // Get the liked/ unliked information (http.get) add this later

  getLikesList (id: Object) {
    return this.http.post<any>(this.likedListURL, id);
  }

  deleteWit(id){
    return this.http.post<any>(this.deleteWitURL, id);
  }

  // user is an object that contains the member variables username, password, age, email
  editProfile (user){
    return this.http.post<any>(this.editProfileURL,user);
  }

}
