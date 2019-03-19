import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserProfileServiceService } from '../../services/user-profile-service.service';
import { FollowService } from 'src/app/search-engine/services/follow.service';

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  
  @Input() userData;
  @Output() refreshUserInfo = new EventEmitter<any>();
  userLoggedIN: any;

  constructor(private auth: AuthService,
    private userProfileService: UserProfileServiceService,
    private followService: FollowService,
    ) {}

  ngOnInit() {
    this.sendUserToken();
  }

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

  followUser(username) {    
    const obj = { userLoggedIN: this.userLoggedIN, username: username };
    this.followService.followUser(obj).subscribe(
      res => {
        this.refreshUserInfo.emit(obj);
      },
      err => {
        console.error(err);
      }
    );
  }
}
