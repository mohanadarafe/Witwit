import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  witObject = {};
  wits: any;
  userData: any;
  likesList = [];
  wit_likes: any;

  constructor(
    private timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // populate the timeline with the wits
    this.getUser();
    this.getLikedWits();
    this.getWits();
  }

  getWits() {
    this.timelineService.pullWit().subscribe(
      res => {
        this.wits = res;
        if (this.wits) {
          this.wits = this.wits.reverse();
          this.wits.forEach(element => {
            if (moment(element.time).isSame(moment(), 'day')) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format('MMMM Do YYYY');
            }
            this.getLikedList(element.wit_id);
            element.likesList = this.likesList;
          });
        }
      },
      err => console.log('error', err)
    );
  }

  getUser() {
    // PS: maybe we should change the name of the user that is logged in from 'userLoggedIN' to 'currentUser'
    // When i was working on my other project the professor told us to use the key word 'current'
    // to keep track of the object that are active.
    // (not sure if i should add that comment here or in the backend)

    // Populate the timeline profile with the current user informations

    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }

  getLikedList(id: number): Array<any> {
    const userToken = localStorage.getItem('token');
    const witObj     = {
              wit_id : id,
              token  : userToken };
    this.timelineService.getLikesList(witObj).subscribe(
      res => {
        const list = res;
        this.likesList = [];
        for (let i = 0; i <= list.length; i++ ) {
          if (list[i]) {
            this.likesList.push(list[i]['username']);
          }
        }
      },
      err => {
        console.error('error getting list', err);
      }
    );
    return this.likesList;
  }

  getLikedWits() {
    const userToken = localStorage.getItem('token');
    const userObj   = {token : userToken };

    this.timelineService.getLikedWits(userObj).subscribe(
      res => { },
      err => {console.error(err); }
    );
  }

}
