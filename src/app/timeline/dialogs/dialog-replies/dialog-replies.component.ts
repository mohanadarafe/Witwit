import { ViewChild, ElementRef, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { faTimes, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faThumbsUp,
  faTrashAlt,
  faEdit
} from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { TimelineService } from '../../services/timeline.service';
import { DialogprofileComponent } from 'src/app/profile/dialogs/dialogprofile/dialogprofile.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-replies',
  templateUrl: './dialog-replies.component.html',
  styleUrls: ['./dialog-replies.component.css']
})
export class DialogRepliesComponent implements OnInit {
  @ViewChild('replyPost') replyPost: ElementRef;
  @ViewChild('editArea') editArea: ElementRef;

  @Input() data;
  wit: any;
  replies: any;
  userData: any;

  faTimes = faTimes;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  faEdit = faEdit;

  edit = {};

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.wit = this.data;
    this.getUser();
    this.getLikedReplies();
    this.showAll(this.wit.wit_id);
  }
  getUser() {
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res[0];
      },
      err => {
        console.error(err);
      }
    );
  }

  getLikedReplies() {
    const USERTOKEN = localStorage.getItem('token');
    const USEROBJ   = { token : USERTOKEN };
    this.timelineService
      .getLikedReplies(USEROBJ)
      .subscribe(
        res => {},
        err => {
          console.error(err);
        });
  }

  // Show all the wits there is:
  showAll(id) {
    const WITOBJ = {
      wit_id: id
    };

    this.timelineService.repliesList(WITOBJ).subscribe(
      res => {
        this.replies = res;

        if (typeof this.replies === 'string') {
          this.replies = undefined;
        }
        if (this.replies) {
          this.replies.forEach(element => {
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

  // To see if the user can like or dislike a wit:
  checkIfUserLiked(reply: any) {
    if (reply.boolValue === 0) {
      this.likeReply(reply.reply_id);
    } else if (reply.boolValue === 1 && reply.numOfLikes !== 0) {
      this.unLikeReply(reply.reply_id);
    }
    this.showAll(this.wit.wit_id);
  }

  // Like a wit:
  likeReply(id: number) {
    const USERTOKEN = localStorage.getItem('token');
    const LIKEOBJ   = {
              reply_id : id,
              token    : USERTOKEN };

    this.timelineService.likeReplyFunction(LIKEOBJ).subscribe(
      res => {
        this.snackBar.open('reply liked successfully', 'ok', {
          duration: 3000
        });
        this.showAll(this.wit.wit_id);
      },
      err => {
        this.snackBar.open('Error liking reply', 'ok', {
          duration: 3000
        });
      }
    );
  }

  // Unlike a wit:
  unLikeReply(id: number) {
    const USERTOKEN = localStorage.getItem('token');
    const UNLIKEOBJ   = {
              reply_id : id,
              token    : USERTOKEN };

    this.timelineService.unlikeReplyFunction(UNLIKEOBJ).subscribe(
      res => {
        this.snackBar.open('reply unliked successfully', 'ok', {
          duration: 3000
        });
        this.showAll(this.wit.wit_id);
      },
      err => {
        this.snackBar.open('Error unliking reply', 'ok', {
          duration: 3000
        });
      }
    );
  }

  // Delete a reply:
  deleteReply(id) {
    const IDOBJ = { reply_id: id };
    this.timelineService.deletingReply(IDOBJ).subscribe(
      res => {
        this.snackBar.open('reply deleted successfully', 'ok', {
          duration: 3000
        });
        this.getLikedReplies();
        this.showAll(this.wit.wit_id);
      },
      err => {
        this.snackBar.open('Error deleting reply', 'ok', {
          duration: 3000
        });
      }
    );
  }

  editReply(id) {
    this.edit[id] = !this.edit[id];
  }

  newPost(id) {
    const USERTOKN = localStorage.getItem('token');
    const NEWREPLY  = {
      'reply'     : this.editArea.nativeElement.value,
      'reply_id'  : id,
      'token'     : USERTOKN
    };

    this.timelineService.editReplyContent(NEWREPLY).subscribe(
      res => {
        this.snackBar.open('Edited reply successfully', 'ok', {
          duration: 3000
        });
        this.getLikedReplies();
        this.showAll(this.wit.wit_id);
      },
      err => {
        this.snackBar.open('Error editing reply', 'ok', {
          duration: 3000
        });
      }
    );
  }

  // To post the reply:
  submitReply(value: string, wit_id: number) {
    const REPLYOBJ     = {};

    REPLYOBJ['reply']  = value;
    REPLYOBJ['wit_id'] = wit_id;
    REPLYOBJ['token']  = localStorage.getItem('token');

    this.timelineService.postReply(REPLYOBJ).subscribe(
      res => {
        this.replyPost.nativeElement.value = '';
        this.getLikedReplies();
        this.showAll(this.wit.wit_id);
        this.snackBar.open('Reply posted successfully', 'ok', {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open('Error posting Reply', 'ok', {
          duration: 3000
        });
      }
    );
  }

  openDialogLikes(reply: any) {
    const MDOALREF = this.modalService.open(DialogprofileComponent);
    MDOALREF.componentInstance.reply = reply;
  }
}
