import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../services/profile.service";
import * as moment from "moment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userWits: any;
  likesListProfile = [];
  constructor( private profileService: ProfileService) { }
  

  ngOnInit() {
//populate the profile with the wits
this.getUserWits()

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

}