import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private timelineURL = 'http://localhost:3002/routes/timeline/timeline';
  private witPostURL = 'http://localhost:3002/routes/witPost/witPost';
  private timelineProfileURL = 'http://localhost:3002/routes/timelineProfile/timelineProfile';
  private timelineLikeURL = 'http://localhost:3002/routes/timeline/like';
  private timelineUnlikeURL = 'http://localhost:3002/routes/timeline/unlike';
  private likedListURL = 'http://localhost:3002/routes/timeline/likesList';
  private likedWitsURL = 'http://localhost:3002/routes/timeline/likedWits';
  private deleteWitURL = 'http://localhost:3002/routes/timeline/deleteWit';

  constructor(private http: HttpClient) { }

  postWit(wit: Object) {
    return this.http.post<any>(this.witPostURL, wit);
  }

  //Get the wits from the backend
  pullWit() {
    var token = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.timelineURL, token);
  }

   //Get the user informations from the backend
  requestUserData (){
    var token = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.timelineProfileURL, token);
  }

  //Get like information from back-end
  likeWit (id: Object){
    return this.http.post<any>(this.timelineLikeURL, id);
  }

  //Get like information from back-end
  unlikeWit (id: Object){
    return this.http.post<any>(this.timelineUnlikeURL, id);
  }

  getLikesList (id: Object) {
    return this.http.post<any>(this.likedListURL, id);
  }

  getLikedWits() {
    return this.http.get<any>(this.likedWitsURL);
  }

  getLikes(id: Object) {
    return this.http.post<any>(this.likedListURL, id);
  }

  deleteWit(id){
    return this.http.post<any>(this.deleteWitURL, id);
  }
}
