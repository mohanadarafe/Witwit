import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TimelineService } from "../services/timeline.service";
import { MatSnackBar } from "@angular/material";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

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

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar
  ) {}

  //method that will be automatically invoked when the page will be loaded
  ngOnInit() {
    //populate the timeline with the wits
    this.getWits();

    this.getUser();
  }

  getWits() {
    this.timelineService.pullWit().subscribe(
      res => {
        this.wits = res;
        this.wits = this.wits.reverse();
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
      },
      err => console.log("error")
    );
  }

  likePost(id: number) {
    const likeObj = { wit_id: id };

    console.log(this.likesList);

    if (this.likesList) {
      const bool = this.likesList.find( function(element) {
        console.log(this.userData);
        if (this.userData) {
          return element === this.userData[0].userName;
        }        
      })
      console.log(bool);
    };
    

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
    const unLikeObj = { wit_id: id };
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
        console.log(res);
        this.likesList = res;
      },
      err => {
        console.error("error gettinglist", err);
      }
    );
    this.likePost(id);
  }
}
