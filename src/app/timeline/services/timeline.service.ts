import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
// Timeline Page's URLs:
  private timelineURL        = 'http://localhost:3002/routes/main_pages/timeline/timeline';
  private timelineProfileURL = 'http://localhost:3002/routes/main_pages/timeline/timelineProfile';

// Wits' URLs:
  private witPostURL         = 'http://localhost:3002/routes/postWit_postReply/post/postWit';
  private likedWitsURL       = 'http://localhost:3002/routes/like/likeCheck/likedWits';
  private deleteWitURL       = 'http://localhost:3002/routes/postWit_postReply/delete/deleteWit';

// Likes' URLs:
  private likeWitURL         = 'http://localhost:3002/routes/like/likeWit/likeWit';
  private unlikeWitURL       = 'http://localhost:3002/routes/like/likeWit/unlikeWit';
  private replyLikeURL       = 'http://localhost:3002/routes/like/likeReply/likeReply';
  private replyUnlikeURL     = 'http://localhost:3002/routes/like/likeReply/unlikeReply';
  private checkLikedWitsURL  = 'http://localhost:3002/routes/main_pages/profile/likedWitsTab';

// Likes' lists:
  private witLikesListURL    = 'http://localhost:3002/routes/like/likeList/witLikesList';
  private replyLikeList      = 'http://localhost:3002/routes/like/likeList/replyLikesList';

// reply's URLs:
  private replyPostURL       = 'http://localhost:3002/routes/postWit_postReply/post/postReply';
  private likedRepliesURL    = 'http://localhost:3002/routes/like/likeCheck/likedReplies';
  private replyListURL       = 'http://localhost:3002/routes/postWit_postReply/repliesList/repliesList';
  private deleteReplyURL     = 'http://localhost:3002/routes/postWit_postReply/delete/deleteReply';

// Replies:
private getReplyContentURL   = 'http://localhost:3002/routes/postWit_postReply/edit/getReplyContent';
private editReplyContentURL  = 'http://localhost:3002/routes/postWit_postReply/edit/editReply';

  constructor(private http: HttpClient) { }

  getReplyContent (reply) {
    return this.http.post <any>(this.getReplyContentURL, reply);
  }

  editReplyContent (reply) {
    return this.http.post <any>(this.editReplyContentURL, reply);
  }

  getLikedReplies (userToken) {
    return this.http.post<any>(this.likedRepliesURL, userToken);
  }

  deletingReply (id: Object) {
    return this.http.post<any>(this.deleteReplyURL, id);
  }
  getReplyLikeList(id: Object) {
    return this.http.post<any>(this.replyLikeList, id);
  }

  unlikeReplyFunction(reply: Object) {
    return this.http.post<any>(this.replyUnlikeURL, reply);
  }
  likeReplyFunction(reply: Object) {
    return this.http.post<any>(this.replyLikeURL, reply);
  }

  repliesList(id: Object) {
    return this.http.post<any>(this.replyListURL, id);
  }

  postReply(reply: Object) {
    return this.http.post<any>(this.replyPostURL, reply);
  }

  postWit(wit: Object) {
    return this.http.post<any>(this.witPostURL, wit);
  }

  pullWit() {
    const TOKEN = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.timelineURL, TOKEN);
  }

  requestUserData () {
    const TOKEN = {token: localStorage.getItem('token')};
    return this.http.post<any>(this.timelineProfileURL, TOKEN);
  }

  likeWit (id: Object) {
    return this.http.post<any>(this.likeWitURL, id);
  }

  unlikeWit (id: Object) {
    return this.http.post<any>(this.unlikeWitURL, id);
  }

  getLikesList (id: Object) {
    return this.http.post<any>(this.witLikesListURL, id);
  }

  getLikedWits(userToken) {
    return this.http.post<any>(this.likedWitsURL, userToken);
  }

  deleteWit(wit) {
    return this.http.post<any>(this.deleteWitURL, wit);
  }

  checkLikedWits(userToken){
    return this.http.post<any>(this.checkLikedWitsURL, userToken);
  }
}
