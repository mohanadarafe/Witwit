import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-dialog-replies',
  templateUrl: './dialog-replies.component.html',
  styleUrls: ['./dialog-replies.component.css']
})
export class DialogRepliesComponent implements OnInit {
  wit: any;
  faTimes = faTimes;
  replies: any;

  constructor(
    private timelineService: TimelineService,
    private dialogRef: MatDialogRef<DialogRepliesComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.wit = data;
  }
  ngOnInit() {
   this.showAll(this.wit);
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
    const likeObj = { wit_id: id };
    this.timelineService.likeReplyFunction(likeObj).subscribe(
      res => {
        this.snackBar.open('Wit liked successfully', 'ok', {
          duration: 3000
        });
        this.getWits();
      },
      err => {
        this.snackBar.open('Error liking wit', 'ok', {
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
        this.snackBar.open('Wit unliked successfully', 'ok', {
          duration: 3000
        });
        this.getWits();
      },
      err => {
        this.snackBar.open('Error unliking wit', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }


  close() {
    this.dialogRef.close();
  }
}
