import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeartBroken, faComment } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faThumbsUp,
  faTrashAlt,
  faAddressBook
} from '@fortawesome/free-regular-svg-icons';
import { TimelineService } from '../../services/timeline.service';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/likes-dialog/likes-dialog.component';
import { DialogRepliesComponent } from '../../dialogs/dialog-replies/dialog-replies.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-of-wits',
  templateUrl: './list-of-wits.component.html',
  styleUrls: ['./list-of-wits.component.css']
})
export class ListOfWitsComponent implements OnInit {
  @Input() wits;
  @Input() userData;

  @Output() refreshWits = new EventEmitter<any>();

  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faAddressBook = faAddressBook;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  // To delete the wit from both frontend and tell the backend about it
  deleteWit(id) {
    const USERTOKEN = localStorage.getItem('token')
    const WITOBJ    = {
            wit_id : id.wit_id,
            token  : USERTOKEN };

    this.timelineService.deleteWit(WITOBJ).subscribe(
      res => {
        this.refreshWits.emit();
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

  // To open a dialog for the likes of a wit:
  openListOfLikesDialog(wit: any) {
    const DIALOGCONFIG = new MatDialogConfig();
    DIALOGCONFIG.width = '60%';
    DIALOGCONFIG.data = {
      wit_id: wit.wit_id
    };
    this.dialog.open(DialogComponent, DIALOGCONFIG);
  }

  // To see if we need to show the like on unlike button:
  checkIfUserLiked(wit: any) {
    if (wit.boolValue === 0) {
      this.likePost(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0) {
      this.unLikePost(wit.wit_id);
    }
  }

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
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open('Error liking wit', 'ok', {
          duration: 3000
        });
      }
    );
  }

  // To dislike a wit:
  unLikePost(id: number) {
    const USERTOKEN = localStorage.getItem('token');
    const UNLIKEOBJ   = {
              wit_id : id,
              token  : USERTOKEN
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

  // To get the list of replies for a wit:
  getReplies(wit) {
    const IDOBJ = { wit_id: wit.wit_id };
    this.timelineService.repliesList(IDOBJ).subscribe(
      res => {
        this.openDialogReplies(wit);
      },
      err => {
         console.error('error', err);
      }
    );
  }

  // Open a dialog to show the replies for a wit:
  openDialogReplies(wit) {
    const MODALREF = this.modalService.open(DialogRepliesComponent);
    MODALREF.componentInstance.data = wit;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
