import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogLikesComponent } from './dialog-likes/dialog-likes.component';
@Component({
  selector: 'app-dialog-replies',
  templateUrl: './dialog-replies.component.html',
  styleUrls: ['./dialog-replies.component.css']
})
export class DialogRepliesComponent implements OnInit {
  wit: any;
  faTimes = faTimes;
  replies: any;
  userData: any;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogRepliesComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.wit = data;
  }
  ngOnInit() {
   this.getUser();
   this.refreshing();
   this.showAll(this.wit);
  }
  getUser() {
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }
  refreshing() {
    this.timelineService
    .getLikedReplies()
    .subscribe(res => console.log(), err => console.error(err));
  }
  showAll(id) {
    this.timelineService.repliesList(id).subscribe(
      res => {
        this.replies = res;
        console.log(this.replies);
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
       err => console.log(err)
     );
   }
  checkIfUserLiked(reply: any) {
    if (reply.boolValue === 0) {
      this.likeReply(reply.reply_id);
    } else if (reply.boolValue === 1 && reply.numOfLikes !== 0) {
      this.unLikeReply(reply.reply_id);
    }
  }
  likeReply(id: number) {
    const likeObj = { reply_id: id };
    this.timelineService.likeReplyFunction(likeObj).subscribe(
      res => {
        this.snackBar.open('reply liked successfully', 'ok', {
          duration: 3000
        });
        this.refreshing();
        this.showAll(this.wit);
      },
      err => {
        this.snackBar.open('Error liking reply', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }
  unLikeReply(id: number) {
    const unLikeObj = { reply_id: id };
    this.timelineService.unlikeReplyFunction(unLikeObj).subscribe(
      res => {
        this.snackBar.open('reply unliked successfully', 'ok', {
          duration: 3000
        });
        this.refreshing();
        this.showAll(this.wit);
      },
      err => {
        this.snackBar.open('Error unliking reply', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  openDialog(reply: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      reply_id : reply.reply_id
     };
    this.dialog.open(DialogLikesComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => { });
  }


  close() {
    this.dialogRef.close();
  }

  deleteReply(id) {
    const idObj = { reply_id: id};
    this.timelineService.deletingReply(idObj).subscribe(
      res => {
        this.snackBar.open('reply deleted successfully', 'ok', {
          duration: 3000
        });
        this.refreshing();
        this.showAll(this.wit);
      },
      err => {
        this.snackBar.open('Error deleting reply', 'ok', {
          duration: 3000
        });
      }
    );
  }
}
