import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faHeartBroken, faComment } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faThumbsUp,
  faTrashAlt,
  faAddressBook
} from "@fortawesome/free-regular-svg-icons";
import { TimelineService } from "../../services/timeline.service";
import { MatSnackBar, MatDialogConfig, MatDialog } from "@angular/material";
import { DialogComponent } from "../../dialogs/likes-dialog/likes-dialog.component";
import { DialogRepliesComponent } from "../../dialogs/dialog-replies/dialog-replies.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-list-of-wits",
  templateUrl: "./list-of-wits.component.html",
  styleUrls: ["./list-of-wits.component.css"]
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

  deleteWit(id) {
    const userToken = localStorage.getItem('token')
    const witObj    = {
            wit_id : id.wit_id,
            token  : userToken };

    this.timelineService.deleteWit(witObj).subscribe(
      res => {
        this.refreshWits.emit();
        this.snackBar.open("Wit deleted successfully", "ok", {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open("Error deleting wit", "ok", {
          duration: 3000
        });
      }
    );
  }

  openListOfLikesDialog(wit: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.data = {
      wit_id: wit.wit_id
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }

  checkIfUserLiked(wit: any) {
    if (wit.boolValue === 0) {
      this.likePost(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0) {
      this.unLikePost(wit.wit_id);
    }
  }

  likePost(id: number) {
    const userToken = localStorage.getItem('token');
    const likeObj   = {
              wit_id : id,
              token  : userToken
              };
    this.timelineService.likeWit(likeObj).subscribe(
      res => {
        this.snackBar.open("Wit liked successfully", "ok", {
          duration: 3000
        });
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open("Error liking wit", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  unLikePost(id: number) {
    const userToken = localStorage.getItem('token');
    const unLikeObj   = {
              wit_id : id,
              token  : userToken
              };
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

  getReplies(wit) {
    const idObj = { wit_id: wit.wit_id };
    this.timelineService.repliesList(idObj).subscribe(
      res => {
        this.openDialogReplies(wit);
      },
      err => console.error("error", err)
    );
  }

  openDialogReplies(wit) {
    const modalRef = this.modalService.open(DialogRepliesComponent);
    modalRef.componentInstance.data = wit;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
