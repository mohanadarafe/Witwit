import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { TimelineService } from '../../../timeline/services/timeline.service';
import { UserProfileServiceService } from '../../services/user-profile-service.service';
import { faHeartBroken, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { DialogprofileComponent } from '../../../profile/dialogs/dialogprofile/dialogprofile.component';
import { DialogRepliesComponent } from '../../../timeline/dialogs/dialog-replies/dialog-replies.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.css']
})
export class UserLikesComponent implements OnInit {
  @ViewChild('replyPost') replyPost: ElementRef;
  @Input() user;
  @Input() userLoggedIN;

  likedWits: any;
  likesListProfile: any[];
  userLoggedInLikes: any[];

  faHeartBroken = faHeartBroken;
  faHeart = faHeart;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faTrashAlt = faTrashAlt;

  constructor(
    private snackBar: MatSnackBar,
    private timelineService: TimelineService,
    private userProfileService: UserProfileServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    //this.checkLiking();
    this.getlikedWits(this.user);
    
  }

  getlikedWits(user) {

    this.userProfileService.getlikedWits(user).subscribe(
      res => {
        this.likedWits = res;
        if (typeof this.likedWits !== 'object') {
          this.likedWits = undefined;
        }
        if (this.likedWits) {
          this.likedWits = this.likedWits.reverse();
          this.likedWits.forEach(element => {
            if (moment(element.time).isSame(moment(), 'day')) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format('MMMM Do YYYY');
            }
          });
        }
      },
      err => console.error(err)
    );
  }

  likePostLikeSection(id: number) {
    const userToken = localStorage.getItem('token');
    const likeObj   = {
            wit_id  : id,
            token   : userToken
          };
    this.timelineService.likeWit(likeObj).subscribe(
      res => {
        this.snackBar.open('Wit liked successfully', 'ok', {
          duration: 3000
        });
        
        this.getlikedWits(this.user);
      },
      err => {
        this.snackBar.open('Error liking wit', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  unLikePostLikeSection(id: number) {
    const userToken = localStorage.getItem('token');
    const unLikeObj   = {
            wit_id  : id,
            token   : userToken
          };

    this.timelineService.unlikeWit(unLikeObj).subscribe(
      res => {
        this.snackBar.open('Wit unliked successfully', 'ok', {
          duration: 3000
        });
        this.getlikedWits(this.user);
      },
      err => {
        this.snackBar.open('Error unliking wit', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  checkLiking(){
    const userToken = localStorage.getItem('token');
    const userObj   = {token : userToken};
    this.timelineService.checkLikedWits(userObj).subscribe(
      res => {this.userLoggedInLikes=res
      console.log(res)},
      err => {console.error(err)}
    );
  }

  checkIfUserLikedLikeSection(wit: any) {
    if (wit.boolValue === 0) {
      this.likePostLikeSection(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0) {
      this.unLikePostLikeSection(wit.wit_id);
    }
  }

  openDialogLikes(wit: any) {
    const modalRef = this.modalService.open(DialogprofileComponent);
    modalRef.componentInstance.wit = wit;
  }

  openDialogReplies(wit) {
    const modalRef = this.modalService.open(DialogRepliesComponent);
    modalRef.componentInstance.data = wit;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
