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
import { ProfileService } from '../../../profile/services/profile.service';

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
  faHeart       = faHeart;
  faThumbsUp    = faThumbsUp;
  faComment     = faComment;
  faTrashAlt    = faTrashAlt;

  constructor(
    private snackBar: MatSnackBar,
    private timelineService: TimelineService,
    private userProfileService: UserProfileServiceService,
    private modalService: NgbModal,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.getlikedWits(this.user);
  }

  // Retrieve the list of liked wits by a user:
  getlikedWits(user) {
    const USERTOKEN = localStorage.getItem('token');
    const USEROBJ   = {
          username : user.username,
          token    : USERTOKEN
          };

    this.userProfileService.getlikedWits(USEROBJ).subscribe(
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
      err => {
        console.error(err);
      }
    );
  }

  // Like a wit from the liking tab:
  likePostLikeSection(id: number) {
    const USERTOKEN = localStorage.getItem('token');
    const LIKEOBJ   = {
            wit_id  : id,
            token   : USERTOKEN
          };
    this.timelineService.likeWit(LIKEOBJ).subscribe(
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
      }
    );
  }

    // UnLike a wit from the liking tab:
  unLikePostLikeSection(id: number) {
    const USERTOKEN   = localStorage.getItem('token');
    const UNLIKEOBJ   = {
            wit_id  : id,
            token   : USERTOKEN
          };

    this.timelineService.unlikeWit(UNLIKEOBJ).subscribe(
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
      }
    );
  }

  checkLikeSection(wit: any) {
    if (wit.boolValueUser === 0) {
      this.likePostLikeSection(wit.wit_id);
    } else if (wit.boolValueUser === 1 && wit.numOfLikes !== 0) {
      this.unLikePostLikeSection(wit.wit_id);
    }
  }

  openDialogLikes(wit: any) {
    const MODALREF = this.modalService.open(DialogprofileComponent);
    MODALREF.componentInstance.wit = wit;
  }

  openDialogReplies(wit) {
    const MODALREF = this.modalService.open(DialogRepliesComponent);
    MODALREF.componentInstance.data = wit;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
