import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  wits: any;
  userData: any;
  wit_likes: any;

  witObject = {};
  likesList = [];
  constructor(
    private timelineService: TimelineService
  ) {}

  ngOnInit() {
    // populate the timeline with the wits
    this.getUser();
    this.getLikedWits();
    this.getWits();
  }

  // To get the wits posted by all users:
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
      err => {
        console.log('error', err);
      }
    );
  }

  // Get the info of the current user:
  getUser() {
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  getLikedList(id: number): Array<any> {
    const USERTOKEN = localStorage.getItem('token');
    const WITOBJ     = {
              wit_id : id,
              token  : USERTOKEN };
    this.timelineService.getLikesList(WITOBJ).subscribe(
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
    const USERTOKEN = localStorage.getItem('token');
    const USEROBJ   = {token : USERTOKEN };

    this.timelineService.getLikedWits(USEROBJ).subscribe(
      res => { },
      err => {
        console.error(err);
       }
    );
  }

}
