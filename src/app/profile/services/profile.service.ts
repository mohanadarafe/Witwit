import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileURL = 'http://localhost:3002/routes/profile/profile';
  private likedListURL = 'http://localhost:3002/routes/timeline/likesList';
  private deleteWitURL = 'http://localhost:3002/routes/profile/deleteWit';


  constructor(private http: HttpClient) { }


   //Get the user wits from the backend
  requestUserWits (){
    return this.http.get<any>(this.profileURL);
  }

  getLikesList (id: Object) {
    return this.http.post<any>(this.likedListURL, id);
  }

  deleteWit(id){
    return this.http.post<any>(this.deleteWitURL, id);
  }

}
