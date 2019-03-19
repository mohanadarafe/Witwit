import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { TimelineService } from '../../timeline/services/timeline.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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
    this.getLikedWitsList();
    this.getUserWits();
  }

  getLikedWits() {
    const userToken = localStorage.getItem('token');
    const userObj   = {token : userToken };

    this.timelineService.getLikedWits(userObj).subscribe(
      res => { },
      err => {console.error(err); }
    );
  }

  getUser() {
    // Populate the profile with the current user informations
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
            if (moment(element.time).isSame(moment(), 'day')) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format('MMMM Do YYYY');
            }
            this.getLikedList(element.wit_id);
            element.likesList = this.likesListProfile;
          });
        }
      },
      err => console.error('Get user wits error', err)
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
            this.likesListProfile.push(list2[i]['username']);
          }
        }
      },
      err => {
        console.error('error getting list', err);
      }
    );
    return this.likesListProfile;
  }
  getLikedWitsList () {
    const userToken = localStorage.getItem('token');
    const userObj   = {token : userToken };

    this.profileService.getLikedWitList(userObj).subscribe(
      res => {
          this.likedWits = res;
      },
      err => {
          console.error(err);
      }
    );
}
}
