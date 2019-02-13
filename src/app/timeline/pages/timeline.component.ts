import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TimelineService } from "../services/timeline.service";
import { MatSnackBar } from "@angular/material";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogComponent } from '../dialog/dialog/dialog.component';

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  witObject = {};
  @ViewChild("witPost") witPost: ElementRef;
  wits: any;
  userData: any;
  faHeart = faHeart;
  faHeartBroken = faHeartBroken;
  likesList: any;
  wit_likes:any;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    //populate the timeline with the wits
    this.getUser();
    this.timelineService
      .getLikedWits()
      .subscribe(res => console.log(),
        err => console.error(err));
    this.getWits();
  }

  getWits() {
    this.timelineService.pullWit().subscribe(
      res => {
        this.wits = res;
        this.wits = this.wits.reverse();
        if (this.wits) {
          this.wits.forEach(element => {
            if (moment(element.time).isSame(moment(), "day")) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format("MMMM Do YYYY");
            }
          });
        }
      },
      err => console.log("error", err)
    );
  }

  submitWit(value: string) {
    this.witObject["wit"] = value;
    this.timelineService.postWit(this.witObject).subscribe(
      res => {
        this.witPost.nativeElement.value = "";
        this.snackBar.open("Wit posted successfully", "ok", {
          duration: 3000
        });
        this.getWits();
      },
      err => {
        this.snackBar.open("Error posting wit", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  getUser() {
    //PS: maybe we should change the name of the user that is logged in from 'userLoggedIN' to 'currentUser'
    //When i was working on my other project the professor told us to use the key word 'current'
    // to keep track of the object that are active.
    //(not sure if i should add that comment here or in the backend)

    //Populate the timeline profile with the current user informations

    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
        console.log('here');
      },
      err => console.error(err)
    );
  }

  likePost(id: number) {
    const likeObj = { 'wit_id': id };
    this.timelineService.likeWit(likeObj).subscribe(
      res => {
        this.snackBar.open("Wit liked successfully", "ok", {
          duration: 3000
        });
        this.getWits();
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
    const unLikeObj = { 'wit_id': id };
    this.timelineService.unlikeWit(unLikeObj).subscribe(
      res => {
        this.snackBar.open("Wit unliked successfully", "ok", {
          duration: 3000
        });
        this.getWits();
      },
      err => {
        this.snackBar.open("Error unliking wit", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }

  getLikedList(id: number) {
    const idObj = { wit_id: id };
    this.timelineService.getLikesList(idObj).subscribe(
      res => {
        this.likesList = res;
      },
      err => {
        console.error("error gettinglist", err);
      }
    );
  }

  checkIfUserLiked(wit: any) {
    console.log(wit);
    if (wit.boolValue === 0) {
      this.likePost(wit.wit_id);
    } else if (wit.boolValue === 1 && wit.numOfLikes !== 0){
      this.unLikePost(wit.wit_id);
    }

  }
  openDialog(wit: any) {
    this.wit_likes = wit;
    console.log(this.wit_likes);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    dialogConfig.data = {
      wit_id: wit.wit_id
     };
    this.dialog.open(DialogComponent, dialogConfig);
  }
}
