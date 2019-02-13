import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TimelineService } from "../services/timeline.service";
import { MatSnackBar } from "@angular/material";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import * as moment from "moment";

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
  fas = fas;
  far = far;
  likesList: any;
  fullHeart: boolean;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //populate the timeline with the wits
    this.getUser();
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
    if (this.checkIfUserLiked(this.likesList)) {
      this.fullHeart = true;
    } else {
      this.fullHeart = false;
    }
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
      },
      err => console.log("error")
    );
  }

  likePost(id: number) {
    const likeObj = { wit_id: id };
    this.timelineService.likeWit(likeObj).subscribe(
      res => {
        this.snackBar.open("Wit liked successfully", "ok", {
          duration: 3000
        });
        this.fullHeart = false;
        this.getWits();
        this.wits.forEach(element => {
          if (element.wit_id == id) {
            element.fullHeart = false; 
          } else {
            element.fullHeart = true; 
          }
        });
      },
      err => {
        this.snackBar.open("Error liking wit", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
    console.log(this.wits);
    
  }

  unLikePost(id: number) {
    const unLikeObj = { wit_id: id };
    this.timelineService.unlikeWit(unLikeObj).subscribe(
      res => {
        this.snackBar.open("Wit unliked successfully", "ok", {
          duration: 3000
        });
        this.wits.forEach(element => {
          if (element.wit_id == id) {
            element.fullHeart = true; 
          } else {
            element.fullHeart = false; 
          }
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
    console.log(this.wits);

  }

  getLikedList(id: number) {
    const idObj = { wit_id: id };
    this.timelineService.getLikesList(idObj).subscribe(
      res => {
        this.likesList = res;
        const bool = this.checkIfUserLiked(this.likesList);
        if (bool) {
          this.unLikePost(id);
        } else {
          this.likePost(id);
        }
      },
      err => {
        console.error("error gettinglist", err);
      }
    );
  }

  checkIfUserLiked(usersList) {    
    let userName = '';
    if (this.userData) {
      userName = this.userData[0].username;
    }
    let bool = false;
    if (usersList && usersList.length > 0) {
      bool = usersList.find(function(element) {
        if (userName) {
          if (element.username === userName) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    return bool;
  }
}
