import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserProfileServiceService } from '../services/user-profile-service.service';
import * as moment from 'moment';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  witObject = {};
  replyObject = {};
  @ViewChild('replyPost') replyPost: ElementRef;
  @ViewChild('witPost') witPost: ElementRef;
  userWits: any;
  userData: any;
  likesListProfile = [];
  likesOfWits: any;
  listOfFollowing: any;
  listOfFollowers: any;
  likedWits: any;
  userLoggedIN: any;
  userObj: any = {};
  user = {};
  constructor(
    private userProfileService: UserProfileServiceService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
  ) {
    this.user = {
      'username': this.router.snapshot.params['p1']
    };
  }

  ngOnInit() {
    this.sendUserToken();
    this.getUserInfo();
    this.getWits();
  }

  //useless:
  sendUserToken() {
    this.userProfileService.requestUserLoggedIn().subscribe(
      res => { this.userLoggedIN = res; },
      err => console.error(err));
  }

  getUserInfo() {
    this.userObj['username'] = this.user['username'];
    this.userObj['token'] = localStorage.getItem('token');

    this.userProfileService.getUserInfo(this.userObj).subscribe(
      res => { this.userData = res[0];
       },
      err => { console.error(err); });
  }

  getWits() {
    this.userProfileService.getWits(this.user).subscribe(
      res => {
        this.userWits = res;

        if (typeof this.userWits === 'string') {
          this.userWits = undefined
        }

        if (typeof this.userWits !== 'string' && this.userWits ) {
          this.userWits = this.userWits.reverse();
          this.userWits.forEach(element => {
            if (moment(element.time).isSame(moment(), 'day')) {
              element.time = moment(element.time).fromNow();
            } else {
              element.time = moment(element.time).format('MMMM Do YYYY');
            }
            // this.getLikedList(element.wit_id);
             element.likesList = this.likesListProfile;
          });
        }
      },
      err => console.error('error', err)
    );
  }


    submitReply(value: string, wit_id: number) {
      this.replyObject['reply'] = value;
      this.replyObject['wit_id'] = wit_id;
      this.replyObject['token'] = localStorage.getItem('token');
      this.userProfileService.postReply(this.replyObject).subscribe(
        res => {
          this.replyPost.nativeElement.value = '';
          console.error(res);
          this.snackBar.open('Reply posted successfully', 'ok', {
            duration: 3000
          });
        },
        err => {
          this.snackBar.open('Error posting Reply', 'ok', {
            duration: 3000
          });
          console.error(err);
        }
      );
    }



    getUser() {
      this.auth.requestUserData().subscribe(
        res => {
          this.userLoggedIN = res;
        },
        err => console.error(err)
      );
    }



}
