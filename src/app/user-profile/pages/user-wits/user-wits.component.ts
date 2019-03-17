import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHeartBroken, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp, faTrashAlt, faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { TimelineService } from 'src/app/timeline/services/timeline.service';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
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

  constructor(private timelineService: TimelineService,
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

  likePost(id: number) {
    const likeObj = { wit_id: id };
    this.timelineService.likeWit(likeObj).subscribe(
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
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open('Error unliking wit', 'ok', {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  openDialogReplies(wit: any) {
    const modalRef = this.modalService.open(DialogRepliesComponent);
    modalRef.componentInstance.data = wit;
  }

  openDialogLikes(wit: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.data = {
      wit_id: wit.wit_id
     };
    this.dialog.open(DialogprofileComponent, dialogConfig);
  }

}
