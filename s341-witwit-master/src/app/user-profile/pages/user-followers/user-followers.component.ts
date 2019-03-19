import { Component, OnInit, Input } from "@angular/core";
import { UserProfileServiceService } from "../../services/user-profile-service.service";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { DialogFollowingComponent } from "src/app/profile/dialogs/dialog-following/dialog-following.component";
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: "app-user-followers",
  templateUrl: "./user-followers.component.html",
  styleUrls: ["./user-followers.component.css"]
})
export class UserFollowersComponent implements OnInit {
  @Input() user;

  listOfFollowers: any;
  faAddressBook = faAddressBook;

  constructor(
    private userProfileService: UserProfileServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFollowerList(this.user);
  }

  getFollowerList(user) {
    this.userProfileService.getFollowerList(user).subscribe(
      res => {
        this.listOfFollowers = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  openDialogFollowing(following: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30%";
    dialogConfig.data = {
      follow: following
    };
    this.dialog.open(DialogFollowingComponent, dialogConfig);
  }
}
