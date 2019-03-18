import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchEngineService } from '../services/search-engine.service';
import { Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private searchEngineService: SearchEngineService,
              private router: Router) {
    this.route.params.subscribe(params => {
      this.user['username'] = this.route.snapshot.paramMap.get('p1');
      this.requestUsers(this.user);
    });
  }

  ngOnInit() {
    this.getUser();
  }


  getUser() {
    this.auth.requestUserData().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }


  followUser(username) {
    const userToken = localStorage.getItem('token');
    const obj = { 'token': userToken , 'username': username };
    this.searchEngineService.followUser(obj).subscribe(
      res => {
        const userObj = {'username' : username};
        this.requestUsers(userObj);
      },
      err => {
        console.error(err);
      }
    );
  }

  requestUsers(user) {
    const userToken = localStorage.getItem('token');
    const userObj = {'token': userToken, 'username': user.username };
    this.searchEngineService.requestUser(userObj).subscribe(
      res => {this.users = res, this.hidden = false; },
      err => {console.log(err), this.hidden = true; },
    );
  }
}


