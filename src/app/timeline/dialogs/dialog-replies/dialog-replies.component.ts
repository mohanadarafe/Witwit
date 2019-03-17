import { ViewChild, ElementRef, Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faThumbsUp,
  faTrashAlt
} from "@fortawesome/free-regular-svg-icons";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material";
import { TimelineService } from "../../services/timeline.service";

@Component({
  selector: "app-dialog-replies",
  templateUrl: "./dialog-replies.component.html",
  styleUrls: ["./dialog-replies.component.css"]
})
export class DialogRepliesComponent implements OnInit {
  @ViewChild("replyPost") replyPost: ElementRef;

  @Input() data;
  wit: any;
  replies: any;
  userData: any;
  faTimes = faTimes;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar
  ) {
  }
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
      err => console.error(err)
    );
  }

  getLikedReplies() {
    this.timelineService
      .getLikedReplies()
      .subscribe(res => {}, err => console.error(err));
  }

  showAll(id) {
    const wit = {
      wit_id: id
    };
    
    this.timelineService.repliesList(wit).subscribe(
      res => {
        this.replies = res;        
        if (typeof this.replies === 'string') {
          this.replies = undefined;
        }
        if (this.replies) {
          this.replies.forEach(element => {
            if (moment(element.time).isSame(moment(), "day")) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format("MMMM Do YYYY");
            }
          });
        }
      },
      err => console.error(err)
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
        this.snackBar.open("reply liked successfully", "ok", {
          duration: 3000
        });
        this.showAll(this.wit);
      },
      err => {
        this.snackBar.open("Error liking reply", "ok", {
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
        this.snackBar.open("reply unliked successfully", "ok", {
          duration: 3000
        });
        this.showAll(this.wit.wit_id);
      },
      err => {
        this.snackBar.open("Error unliking reply", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  // openDialog(reply: any) {
  //   const dialogConfig = new MatDialogConfig();
  //   // dialogConfig.autoFocus = true;
  //   dialogConfig.width = "60%";
  //   dialogConfig.data = {
  //     reply_id: reply.reply_id
  //   };
  //   this.dialog.open(DialogRepliesLikesComponent, dialogConfig);
  //   // dialogRef.afterClosed().subscribe(result => { });
  // }

  // close() {
  //   this.dialogRef.close();
  // }

  deleteReply(id) {
    const idObj = { reply_id: id };
    this.timelineService.deletingReply(idObj).subscribe(
      res => {
        this.snackBar.open("reply deleted successfully", "ok", {
          duration: 3000
        });
        this.getLikedReplies();
        this.showAll(this.wit.wit_id);
      },
      err => {
        this.snackBar.open("Error deleting reply", "ok", {
          duration: 3000
        });
      }
    );
  }

  submitReply(value: string, wit_id: number) {
    const replyObject = {};

    replyObject["reply"] = value;
    replyObject["wit_id"] = wit_id;

    this.timelineService.postReply(replyObject).subscribe(
      res => {
        this.replyPost.nativeElement.value = "";
        this.getLikedReplies();
        this.showAll(this.wit.wit_id);
        this.snackBar.open("Reply posted successfully", "ok", {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open("Error posting Reply", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }
}
