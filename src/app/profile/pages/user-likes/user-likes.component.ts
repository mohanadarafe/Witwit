import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faThumbsUp,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { TimelineService } from 'src/app/timeline/services/timeline.service';
import { MatSnackBar } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogprofileComponent } from '../../dialogs/dialogprofile/dialogprofile.component';
import { DialogRepliesComponent } from 'src/app/timeline/dialogs/dialog-replies/dialog-replies.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: "app-user-likes",
  templateUrl: "./user-likes.component.html",
  styleUrls: ["./user-likes.component.css"]
})
export class UserLikesComponent implements OnInit {
  @Input() likedWits;
  @Input() userData;
  @Output() refreshLikedWits = new EventEmitter<any>();
  @Output() refreshWits = new EventEmitter<any>();

  faHeartBroken = faHeartBroken;
  faHeart = faHeart;
  faThumbsUp = faThumbsUp;
  faTrashAlt = faTrashAlt;

  constructor(private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private profileService: ProfileService
    ) {}

  ngOnInit(
  ) {}

  likePost(id: number) {
    const likeObj = { wit_id: id };
    this.timelineService.likeWit(likeObj).subscribe(
      res => {
        this.snackBar.open("Wit liked successfully", "ok", {
          duration: 3000
        });
        this.refreshLikedWits.emit();
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
    const unLikeObj = { wit_id: id };
    this.timelineService.unlikeWit(unLikeObj).subscribe(
      res => {
        this.snackBar.open("Wit unliked successfully", "ok", {
          duration: 3000
        });
        this.refreshLikedWits.emit();
      },
      err => {
        this.snackBar.open("Error unliking wit", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  checkIfUserLiked(wit: any) {
    if (wit.boolValue === 0) {
      this.likePost(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0) {
      this.unLikePost(wit.wit_id);
    }
  }

  openLikesDialog(wit: any) {
    const modalRef = this.modalService.open(DialogprofileComponent);
    modalRef.componentInstance.wit = wit;
  }

  openDialogReplies(wit: any) {
    const modalRef = this.modalService.open(DialogRepliesComponent);
    modalRef.componentInstance.data = wit;
  }

  // the user will be able to delete wits from the profile as well
  deleteWit(id) {
    const idObj = { wit_id: id.wit_id };
    this.profileService.deleteWit(idObj).subscribe(
      res => {
        this.snackBar.open("Wit deleted successfully", "ok", {
          duration: 3000
        });
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open("Error deleting wit", "ok", {
          duration: 3000
        });
      }
    );
  }

  stopPropagation(event) {
    event.stopPropagation();
  }


}
