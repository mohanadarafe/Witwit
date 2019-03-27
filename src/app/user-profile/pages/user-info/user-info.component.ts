import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserProfileServiceService } from '../../services/user-profile-service.service';
import { SearchEngineService } from '../../../search-engine/services/search-engine.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() userData;
  @Output() refreshUserInfo = new EventEmitter<any>();
  userLoggedIN: any;

  constructor(private auth: AuthService,
    private userProfileService: UserProfileServiceService,
    private searchEngineService: SearchEngineService,
    ) {}

  ngOnInit() {
    this.sendUserToken();
  }

  // Get the info of the current user:
  getUser() {
    this.auth.requestUserData().subscribe(
      res => {
        this.userLoggedIN = res;
      },
      err => console.error(err)
    );
  }

  sendUserToken() {
    this.userProfileService.requestUserLoggedIn().subscribe(
      res => {
        this.userLoggedIN = res;
      },
      err => console.error(err)
    );
  }
  // This works as follow user and unfollow:
  followUser(username) {
    const USERTOKEN = localStorage.getItem('token');
    const USEROBJ = {
       token : USERTOKEN,
       username: username
      };
    this.searchEngineService.followUser(USEROBJ).subscribe(
      res => {
        this.refreshUserInfo.emit(USEROBJ);
      },
      err => {
        console.error(err);
      }
    );
  }
}
