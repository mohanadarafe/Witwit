import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { MatSnackBar } from '@angular/material';
import { faHeartBroken, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import {DialogRepliesComponent} from '../dialog-replies/dialog-replies.component';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  witObject = {};
  replyObject = {};
  @ViewChild('replyPost') replyPost: ElementRef;
  @ViewChild('witPost') witPost: ElementRef; // what is it used for?
  wits: any;
  userData: any;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  likesList = [];
  wit_likes: any;


  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // populate the timeline with the wits
    this.getUser();
    this.timelineService
      .getLikedWits()
      .subscribe(res => console.log(), err => console.error(err));
    this.getWits();
  }

  getWits() {
    this.timelineService.pullWit().subscribe(
      res => {
        this.wits = res;
        this.wits = this.wits.reverse();
        console.log(this.wits);
        if (this.wits) {
          this.wits.forEach(element => {
            if (moment(element.time).isSame(moment(), 'day')) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format('MMMM Do YYYY');
            }
            this.getLikedList(element.wit_id);
            element.likesList = this.likesList;
          });
        }
      },
      err => console.log('error', err)
    );
  }
  submitReply(value: string, wit_id: number) {
    this.replyObject['reply'] = value;
    this.replyObject['wit_id'] = wit_id;
    this.timelineService.postReply(this.replyObject).subscribe(
      res => {
        this.replyPost.nativeElement.value = '';
        console.log(res);
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

  submitWit(value: string) {
    // witObject will contain the wit posted ("wit") is the key
    this.witObject['wit'] = value;
    this.timelineService.postWit(this.witObject).subscribe(
      res => {
        this.witPost.nativeElement.value = '';
        this.snackBar.open('Wit posted successfully', 'ok', {
          duration: 3000
        });
        this.getWits();
      },
      err => {
        this.snackBar.open('Error posting wit', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  getUser() {
    // PS: maybe we should change the name of the user that is logged in from 'userLoggedIN' to 'currentUser'
    // When i was working on my other project the professor told us to use the key word 'current'
    // to keep track of the object that are active.
    // (not sure if i should add that comment here or in the backend)

    // Populate the timeline profile with the current user informations

    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }

  likePost(id: number) {
    const likeObj = { wit_id: id };
    this.timelineService.likeWit(likeObj).subscribe(
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

  unLikePost(id: number) {
    const unLikeObj = { wit_id: id };
    this.timelineService.unlikeWit(unLikeObj).subscribe(
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


  getReplies(id: number) {
    const idObj = { wit_id: id };
    this.timelineService.repliesList(idObj).subscribe(
      res => {
        console.log(res);
        this.openDialogReplies(res);
      },
      err => console.log('error', err)
    );
  }

  getLikedList(id: number): Array<any> {
    const idObj = { wit_id: id };
    this.timelineService.getLikesList(idObj).subscribe(
      res => {
        const list = res;
        this.likesList = [];
        for (let i = 0; i <= list.length; i++ ) {
          if (list[i]) {
            this.likesList.push(list[i]['username']);
          }
        }
      },
      err => {
        console.error('error getting list', err);
      }
    );
    return this.likesList;
  }

  checkIfUserLiked(wit: any) {
    if (wit.boolValue === 0) {
      this.likePost(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0) {
      this.unLikePost(wit.wit_id);
    }
  }


  openDialogReplies(wit: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = {
      wit_id: wit
     };
     this.dialog.open(DialogRepliesComponent, dialogConfig);
  }
  openDialog(wit: any) {
    this.wit_likes = wit;
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      wit_id: wit.wit_id
     };
    this.dialog.open(DialogComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => { });
  }

  deleteWit(id) {
    const idObj = { wit_id: id.wit_id};
    console.log(idObj);
    this.timelineService.deleteWit(idObj).subscribe(
      res => {
        this.getWits();
        this.snackBar.open('Wit deleted successfully', 'ok', {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open('Error deleting wit', 'ok', {
          duration: 3000
        });
      }
    );
  }
}
