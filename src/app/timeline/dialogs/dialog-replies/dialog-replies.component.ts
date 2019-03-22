import { ViewChild, ElementRef, Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { faTimes, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faThumbsUp,
  faTrashAlt,
  faEdit
} from "@fortawesome/free-regular-svg-icons";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material";
import { TimelineService } from "../../services/timeline.service";
import { DialogprofileComponent } from 'src/app/profile/dialogs/dialogprofile/dialogprofile.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-dialog-replies",
  templateUrl: "./dialog-replies.component.html",
  styleUrls: ["./dialog-replies.component.css"]
})
export class DialogRepliesComponent implements OnInit {
  @ViewChild("replyPost") replyPost: ElementRef;
  @ViewChild("editArea") editArea: ElementRef;

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
  value = "hsdefjkjas";

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
      err => console.error(err)
    );
  }

  getLikedReplies() {
    const userToken = localStorage.getItem('token');
    const userObj   = { token : userToken };
    this.timelineService
      .getLikedReplies(userObj)
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
              element.time = moment(element.time).format('MMMM Do YYYY');
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
    this.showAll(this.wit.wit_id);
  }

  likeReply(id: number) {
    const userToken = localStorage.getItem('token');
    const likeObj   = {
              reply_id : id,
              token    : userToken };

    this.timelineService.likeReplyFunction(likeObj).subscribe(
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
        console.error(err);
      }
    );
  }

  unLikeReply(id: number) {
    const userToken = localStorage.getItem('token');
    const unLikeObj   = {
              reply_id : id,
              token    : userToken };

    this.timelineService.unlikeReplyFunction(unLikeObj).subscribe(
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
        console.error(err);
      }
    );
  }

  deleteReply(id) {
    const idObj = { reply_id: id };
    this.timelineService.deletingReply(idObj).subscribe(
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

  editReply(id){
    //this.edit[id] = {};
    this.edit[id] = !this.edit[id];    
  }

  newPost(id) {
    const userToken = localStorage.getItem('token'); 
    const newValue  = {
      "reply"     : this.editArea.nativeElement.value,
      "reply_id"  : id,
      "token"     : userToken
    }
    
    this.timelineService.editReplyContent(newValue).subscribe(
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

  submitReply(value: string, wit_id: number) {
    const replyObject     = {};

    replyObject['reply']  = value;
    replyObject['wit_id'] = wit_id;
    replyObject['token']  = localStorage.getItem('token');

    this.timelineService.postReply(replyObject).subscribe(
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
        console.error(err);
      }
    );
  }

  openDialogLikes(reply: any) {
    const modalRef = this.modalService.open(DialogprofileComponent);
    modalRef.componentInstance.reply = reply;


    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '30%';
    // dialogConfig.data = {
    //   wit_id: wit.wit_id
    //  };
    // this.dialog.open(DialogprofileComponent, dialogConfig);
  }
}
