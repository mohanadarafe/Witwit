import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../services/profile.service";
import { TimelineService } from "../../timeline/services/timeline.service";
import * as moment from "moment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userWits: any;
  userData: any;
  likesListProfile = [];
  constructor( 
    private profileService: ProfileService, 
    private timelineService: TimelineService
  ){}
  

  ngOnInit() {
 
  this.getUser();
    this.timelineService
      .getLikedWits()
      .subscribe(res => console.log(), err => console.error(err));

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
      err => console.error(err)
    );
  }

//Get Wit, will work on after next push

// getUserWits() {
//   this.profileService.requestUserWits().subscribe(
//     res => {
//       this.userWits = res;
//       this.userWits = this.userWits.reverse();
//       if (this.userWits) {
//         this.userWits.forEach(element => {
//           if (moment(element.time).isSame(moment(), "day")) {
//             element.time = moment(element.time).fromNow();
//           } else {
//             element.time = moment(element.time).format("MMMM Do YYYY");
//           }
//           this.getLikedList(element.wit_id);
//           element.likesList = this.likesListProfile;
//         });
//       }
//     },
//     err => console.log("error", err)
//   );
// }

//Get Liked List, will work on after next push

// getLikedList(id: number): Array<any> {
//   const idObj = { wit_id: id };
//   this.profileService.getLikesList(idObj).subscribe(
//     res => {
//       const list2 = res;
//       this.likesListProfile = [];
//       for (let i=0; i<= list2.length; i++ ) {
//         if (list2[i]) {
//           this.likesListProfile.push(list2[i]['username']);
//         }
//       }
//     },
//     err => {
//       console.error("error getting list", err);
//     }
//   );
//   return this.likesListProfile;
// }

}