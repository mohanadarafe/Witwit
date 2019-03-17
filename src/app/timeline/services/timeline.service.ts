import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private timelineURL = 'http://localhost:3002/routes/timeline/timeline';
  private witPostURL = 'http://localhost:3002/routes/timeline/witPost';
  private timelineProfileURL = 'http://localhost:3002/routes/timelineProfile/timelineProfile';
  private timelineLikeURL = 'http://localhost:3002/routes/timeline/like';
  private timelineUnlikeURL = 'http://localhost:3002/routes/timeline/unlike';
  private likedListURL = 'http://localhost:3002/routes/timeline/likesList';
  private likedWitsURL = 'http://localhost:3002/routes/timeline/likedWits';
  private deleteWitURL = 'http://localhost:3002/routes/timeline/deleteWit';
  private replyPostURL = 'http://localhost:3002/routes/timeline/postReply';
  private replyListURL = 'http://localhost:3002/routes/timeline/repliesList';
  private deleteReplyURL = 'http://localhost:3002/routes/timeline/deleteComment';
  private replyLikeURL = 'http://localhost:3002/routes/timeline/likeReply';
  private replyUnlikeURL = 'http://localhost:3002/routes/timeline/unlikeReply';
//need to be implemented:
  private replyLikeList = 'http://localhost:3002/routes/timeline/replyLikeList';
//need to be implemented:
  private editReply = 'http://localhost:3002/routes/timeline/editReply';
  private likedRepliesURL = 'http://localhost:3002/routes/timeline/likedReplies';

  constructor(private http: HttpClient) { }
  getLikedReplies () {
    return this.http.get<any>(this.likedRepliesURL);
  }

  deletingReply (id: Object) {
    return this.http.post<any>(this.deleteReplyURL, id);
  }
  getReplyLikeList(id: Object) {
    return this.http.post<any>(this.replyLikeList, id);
  }

  unlikeReplyFunction(id: Object) {
    return this.http.post<any>(this.replyUnlikeURL, id);
  }
  likeReplyFunction(id: Object) {
    return this.http.post<any>(this.replyLikeURL, id);
  }

  repliesList(id: Object) {
    return this.http.post<any>(this.replyListURL, id);
  }

  postReply(wit: Object) {
    return this.http.post<any>(this.replyPostURL, wit);
  }

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
    console.log("token request: "+ token.token);
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
