import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeartBroken, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp, faTrashAlt, faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { TimelineService } from 'src/app/timeline/services/timeline.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogRepliesComponent } from 'src/app/timeline/dialogs/dialog-replies/dialog-replies.component';
import { DialogprofileComponent } from 'src/app/profile/dialogs/dialogprofile/dialogprofile.component';

@Component({
  selector: 'app-user-wits',
  templateUrl: './user-wits.component.html',
  styleUrls: ['./user-wits.component.css']
})
export class UserWitsComponent implements OnInit {

  @Input() userWits;
  @Input() userLoggedIN;
  @Output() refreshWits = new EventEmitter<any>();

  faHeart = faHeart;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faAddressBook = faAddressBook;
  faHeartBroken = faHeartBroken;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
  }

  checkIfUserLiked(wit: any) {
    if (wit.boolValue === 0) {
      this.likePost(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0) {
      this.unLikePost(wit.wit_id);
    }
  }

  // To like a wit on the profile of a user by this user
  likePost(id: number) {
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
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open('Error liking wit', 'ok', {
          duration: 3000
        });
      }
    );
  }

  // To be able to unlike a post by a user:
  unLikePost(id: number) {
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
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open('Error unliking wit', 'ok', {
          duration: 3000
        });
      }
    );
  }

  openDialogReplies(wit: any) {
    const MODALREF = this.modalService.open(DialogRepliesComponent);
    MODALREF.componentInstance.data = wit;
  }

  openDialogLikes(wit: any) {
    const MODALREF = this.modalService.open(DialogprofileComponent);
    MODALREF.componentInstance.wit = wit;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

}
