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
  users = [];
  hidden: boolean;
  userData: any;
  list: any;
  followList: any;
  constructor(private route: ActivatedRoute, private auth: AuthService) {
    this.route.params.subscribe(params => {
      this.user['username'] = this.route.snapshot.paramMap.get("p1");
      this.requestUsers(this.hidden);
      console.log(this.users.length);
      console.log(this.users);
      console.log(this.hidden);
    });
  }

  ngOnInit() {
    this.sendUserToken();
    this.getUser();
    this.checkFollow();
  }
  sendUserToken() {
    this.auth.getUserToken().subscribe(
      res => {
      },
      err => {
        console.error('error getting token', err);
      }
    )
  }
  checkFollow() {
    this.auth.getFollowingList().subscribe(
      res => {
        this.list = res;
      },
      err => {
        console.error('error getting list', err);
      }
    );
  }

  getUser() {
    this.auth.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }



  requestUsers(hidden) {
    this.auth.requestUsers(this.user).subscribe(
      res => {this.users = res;
         this.hidden = false;
        this.checkFollow();
        console.log("here is me");
        console.log(this.list);
     },
      err => {console.log(err), this.hidden=true},
      () => {console.log("The search has been completed")},

    );
  }
}


