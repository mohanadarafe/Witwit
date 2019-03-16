import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { MatSnackBar, MatDialogActions } from '@angular/material';
import { TimelineService } from '../../timeline/services/timeline.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogprofileComponent } from '../dialogprofile/dialogprofile.component';
import { EditprofileDialogComponent } from '../editprofile-dialog/editprofile-dialog.component';
import { DialogFollowingComponent } from '../dialog-following/dialog-following.component';
import {DialogComponent} from '../../timeline/dialog/dialog/dialog.component';
import {DialogRepliesComponent} from '../../timeline/dialog-replies/dialog-replies.component';
import {DialogLikesComponent} from '../../timeline/dialog-replies/dialog-likes/dialog-likes.component';
import { faHeartBroken, faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp, faTrashAlt, faAddressBook } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  witObject = {};
  replyObject = {};
  @ViewChild('replyPost') replyPost: ElementRef;
  @ViewChild('witPost') witPost: ElementRef;
  userWits: any;
  userData: any;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faAddressBook = faAddressBook;
  likesListProfile = [];
  likesOfWits: any;
  listOfFollowing: any;
  likedWits: any;
  listOfFollowers: any;
  constructor(
    private profileService: ProfileService,
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}


  ngOnInit() {
 // populate the profile with the user wits
  this.getUser();
      this.timelineService
        .getLikedWits()
        .subscribe(res => console.log(), err => console.error(err));
  this.getUserWits();
  this.getlikedWits();
  this.getFollowingList();
  this.getFollowerList();
  }

  getUser() {
    //Populate the profile with the current user informations
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }
  getlikedWits() {
    this.profileService. getlikedWits().subscribe(
      res => {
        this.likedWits = res;
        this.likedWits = this.likedWits.reverse();
        if (this.likedWits) {
          this.likedWits.forEach(element => {
            if (moment(element.time).isSame(moment(), "day")) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format("MMMM Do YYYY");
            }
            this.getLikedList(element.wit_id);
             element.likesList = this.likesListProfile;
          });
        }
      },
      err => console.error(err)
    );
  }

getUserWits() {
  this.profileService.requestUserWits().subscribe(
    res => {
      this.userWits = res;
      this.userWits = this.userWits.reverse();
      if (this.userWits) {
        this.userWits.forEach(element => {
          if (moment(element.time).isSame(moment(), "day")) {
            element.time = moment(element.time).fromNow();
          } else {
            element.time = moment(element.time).format("MMMM Do YYYY");
          }
          this.getLikedList(element.wit_id);
           element.likesList = this.likesListProfile;
           console.log(this.userWits);
        });
      }
    },
    err => console.log("error", err)
  );
}

openDialog(wit: any) {
  this.likesOfWits = wit;
  const dialogConfig = new MatDialogConfig();
  // dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  dialogConfig.data = {
    wit_id: wit.wit_id
   };
  this.dialog.open(DialogprofileComponent, dialogConfig);
  // dialogRef.afterClosed().subscribe(result => { });
}
openDialogFollowing(following:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "30%";
  dialogConfig.data = {
    follow: following
  };
  this.dialog.open(DialogFollowingComponent,dialogConfig);
}

openEditDialog(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "50%";
  this.dialog.open(EditprofileDialogComponent,dialogConfig);

}

 getFollowingList(){
   this.profileService.getFollowingList().subscribe(
     res => { this.listOfFollowing = res; },
     err => {console.error(err)}
   );}
   getFollowerList() {
     this.profileService.getFollowerList().subscribe(
       res => {
         this.listOfFollowers = res;
       },
       err => {console.error(err)}
     );
   }


getLikedList(id: number): Array<any> {
  const idObj = { wit_id: id };
  this.profileService.getLikesList(idObj).subscribe(
    res => {
      const list2 = res;
      this.likesListProfile = [];
      for (let i=0; i<= list2.length; i++ ) {
        if (list2[i]) {
          this.likesListProfile.push(list2[i]['username']);
        }
      }
    },
    err => {
      console.error("error getting list", err);
    }
  );
  return this.likesListProfile;
}

// the user will be able to delete wits from the profile as well
deleteWit(id){
  const idObj = { wit_id: id.wit_id};
  console.log(idObj);
  this.profileService.deleteWit(idObj).subscribe(
    res => {
      this.getUserWits();
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
likePost(id: number) {
  const likeObj = { wit_id: id };
  this.timelineService.likeWit(likeObj).subscribe(
    res => {
      this.snackBar.open('Wit liked successfully', 'ok', {
        duration: 3000
      });
      this.getlikedWits();
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
      this.getlikedWits();
    },
    err => {
      this.snackBar.open('Error unliking wit', 'ok', {
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


  openDialogReplies(wit: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = {
      wit_id: wit
     };
     this.dialog.open(DialogRepliesComponent, dialogConfig);
  }


}
