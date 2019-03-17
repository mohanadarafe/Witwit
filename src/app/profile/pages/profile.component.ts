import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { TimelineService } from "../../timeline/services/timeline.service";
import * as moment from "moment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  userWits: any;
  userData: any;
  likesListProfile = [];
  likedWits: any;

  constructor(
    private profileService: ProfileService,
    private timelineService: TimelineService
  ) {}

  ngOnInit() {
    // populate the profile with the user wits
    this.getUser();
    this.getLikedWits();
    this.getUserWits();
  }

  getUser() {
    //Populate the profile with the current user informations
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res[0];
      },
      err => console.error(err)
    );
  }

  getUserWits() {
    this.profileService.requestUserWits().subscribe(
      res => {
        this.userWits = res;
        if (this.userWits) {
          this.userWits = this.userWits.reverse();
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
      err => console.error("Get user wits error", err)
    );
  }

  getLikedList(id: number): Array<any> {
    const idObj = { wit_id: id };
    this.profileService.getLikesList(idObj).subscribe(
      res => {
        const list2 = res;
        this.likesListProfile = [];
        for (let i = 0; i <= list2.length; i++) {
          if (list2[i]) {
            this.likesListProfile.push(list2[i]["username"]);
          }
        }
      },
      err => {
        console.error("error getting list", err);
      }
    );
    return this.likesListProfile;
  }

  getLikedWits() {
    this.profileService.getlikedWits().subscribe(
      res => {
        this.likedWits = res;
        if (this.likedWits) {
          this.likedWits = this.likedWits.reverse();
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
}
