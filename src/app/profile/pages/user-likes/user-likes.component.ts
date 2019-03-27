import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faThumbsUp,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { TimelineService } from 'src/app/timeline/services/timeline.service';
import { MatSnackBar } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogprofileComponent } from '../../dialogs/dialogprofile/dialogprofile.component';
import { DialogRepliesComponent } from 'src/app/timeline/dialogs/dialog-replies/dialog-replies.component';
import { ProfileService } from '../../services/profile.service';
import { UserProfileServiceService } from '../../../user-profile/services/user-profile-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.css']
})
export class UserLikesComponent implements OnInit {
  @Input() likedWits;
  @Input() userData;
  @Output() refreshLikedWits = new EventEmitter<any>();
  @Output() refreshWits = new EventEmitter<any>();

  likesListProfile: any[];

  faHeartBroken = faHeartBroken;
  faHeart = faHeart;
  faThumbsUp = faThumbsUp;
  faTrashAlt = faTrashAlt;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private userProfileService:  UserProfileServiceService
    ) {}

  ngOnInit() {
    this.getlikedWits();
  }

  // Retrieve the liked wits by the current User:
  getlikedWits() {
    const USERTOKEN = localStorage.getItem('token');
    const USEROBJ   = {token : USERTOKEN};
    this.profileService.getLikedWitList(USEROBJ).subscribe(
      res => {
        this.likedWits = res;
        if (typeof this.likedWits !== 'object') {
          this.likedWits = undefined;
        }
        if (this.likedWits) {
          this.likedWits = this.likedWits.reverse();

          // To put the accurate date beside every wit
          this.likedWits.forEach(element => {
            if (moment(element.time).isSame(moment(), 'day')) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format('MMMM Do YYYY');
            }
            this.getLikedList(element.wit_id);
            element.likesList = this.likesListProfile;
          });
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  // To identify the wits liked by the current user:
  getLikedList(id: number): Array<any> {
    const IDOBJ = { wit_id: id };
    this.userProfileService.getWitLikesList(IDOBJ).subscribe(
      res => {
        const list2 = res;
        this.likesListProfile = [];
        for (let i = 0; i <= list2.length; i++) {
          if (list2[i]) {
            this.likesListProfile.push(list2[i]['username']);
          }
        }
      },
      err => {
        console.error(err);
      }
    );
    return this.likesListProfile;
  }

  // To like a wit:
  likePost(id: number) {
    const USERTOKEN = localStorage.getItem('token');
    const LIKEOBJ   = {
              wit_id : id,
              token  : USERTOKEN
            };
    this.timelineService.likeWit(LIKEOBJ).subscribe(
      res => {
        this.snackBar.open('Wit liked successfully', 'ok', {
          duration: 3000
        });
        this.refreshLikedWits.emit();
      },
      err => {
        this.snackBar.open('Error liking wit', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  // To unlike a wit:
  unLikePost(id: number) {
    const USERTOKEN = localStorage.getItem('token');
    const UNLIKEOBJ = {
              wit_id : id,
              token  : USERTOKEN };
    this.timelineService.unlikeWit(UNLIKEOBJ).subscribe(
      res => {
        this.snackBar.open('Wit unliked successfully', 'ok', {
          duration: 3000
        });
        this.refreshLikedWits.emit();
      },
      err => {
        this.snackBar.open('Error unliking wit', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  checkIfUserLiked(wit: any) {
    if (wit.boolValue === 0) {
      this.likePost(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0) {
      this.unLikePost(wit.wit_id);
    }
  }

  // A dialog for the likes:
  openLikesDialog(wit: any) {
    const MODALREF = this.modalService.open(DialogprofileComponent);
    MODALREF.componentInstance.wit = wit;
  }

  // A dialog for the replies:
  openDialogReplies(wit: any) {
    const MODALREF = this.modalService.open(DialogRepliesComponent);
    MODALREF.componentInstance.data = wit;
  }

  // the user will be able to delete wits from the profile as well
  deleteWit(id) {
    const IDOBJ = { wit_id: id.wit_id };
    this.profileService.deleteWit(IDOBJ).subscribe(
      res => {
        this.snackBar.open('Wit deleted successfully', 'ok', {
          duration: 3000
        });
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open('Error deleting wit', 'ok', {
          duration: 3000
        });
      }
    );
  }

  stopPropagation(event) {
    event.stopPropagation();
  }


}
