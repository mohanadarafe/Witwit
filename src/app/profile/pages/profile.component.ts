import { Component, OnInit} from '@angular/core';
import { ProfileService } from "../services/profile.service";
import { MatSnackBar, MatDialogActions } from "@angular/material";
import { TimelineService } from "../../timeline/services/timeline.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogprofileComponent } from '../dialogprofile/dialogprofile.component';
import { EditprofileDialogComponent } from '../editprofile-dialog/editprofile-dialog.component';
import { DialogFollowingComponent } from '../dialog-following/dialog-following.component';
import { faHeart, faThumbsUp, faTrashAlt, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import * as moment from "moment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  witObject = {};
  // @ViewChild("witPost") witPost: ElementRef;
  userWits: any;
  userData: any;
  faHeart = faHeart;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  faAddressBook = faAddressBook;
  likesListProfile = [];
  likesOfWits : any;
  listOfFollowing :any;
  constructor( 
    private profileService: ProfileService, 
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ){}
  

  ngOnInit() {
 // populate the profile with the user wits 
  this.getUser();
      this.timelineService
        .getLikedWits()
        .subscribe(res => console.log(), err => console.error(err));
  this.getUserWits();
  this.getFollowingList();

  }

  getUser() {
    //PS: maybe we should change the name of the user that is logged in from 'userLoggedIN' to 'currentUser'
    //When i was working on my other project the professor told us to use the key word 'current'
    // to keep track of the object that are active.
    //(not sure if i should add that comment here or in the backend)

    //Populate the profile with the current user informations
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
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
     res=>{ this.listOfFollowing =res;
            console.log(this.listOfFollowing)},
     err=>{console.error("something wrong "+ err )}
   );}


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
    err =>{
      this.snackBar.open("Error deleting wit", "ok", {
        duration: 3000
      });
    }
  )
}

}