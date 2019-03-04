import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';



@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  user = {};
  users: any;
  hidden: boolean;
  list: any;
  userData: any;
  followList = [];
  followingList = [];

  constructor(private route: ActivatedRoute, private auth : AuthService) {
    this.route.params.subscribe(params => {
      this.user['username'] = this.route.snapshot.paramMap.get("p1");
      this.requestUsers(this.hidden);
      console.log(this.users.length);
      console.log(this.users);
      console.log(this.hidden);
    });
  }

  ngOnInit() {
    this.getUser();
    this.checkFollow();
  }
  getUser() {
    this.auth.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }

  checkFollow() {
    this.auth.getFollowingList().subscribe(
      res => {
        this.list = res;
        console.log("IAMSAMDMSADKSANKD ASDASDAS DSA D");
        this.followList = [];
        console.log(this.list);
      },
      err => {
        console.log("Something bad is happening");
        console.error('error getting list', err);
      }
    );
  }



  requestUsers(hidden) {
    this.auth.requestUsers(this.user).subscribe(
      res => {this.users = res;
        for (let i = 0; i <= this.users.length; i++ ) {
          for (let j = 0; j <= this.list.length; j++) {
          if (this.users[i] && this.list[j]['follow_name'] === this.users[i]['follow_name'] ) {
            this.users[i]['IsFollowed'] = 1;
          } else {
            this.users[i]['IsFollowed'] = 0;
          }
        }
      }
      console.log("users:");
      console.log(this.users);
        this.hidden = false;
            },
      err => {console.log(err), this.hidden = true; },
      () => {console.log("The search has been completed")},

    );
  }
}



