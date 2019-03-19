import { Component, OnInit, Input } from "@angular/core";
import { UserProfileServiceService } from "../../services/user-profile-service.service";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { DialogFollowingComponent } from "src/app/profile/dialogs/dialog-following/dialog-following.component";

@Component({
  selector: "app-user-following",
  templateUrl: "./user-following.component.html",
  styleUrls: ["./user-following.component.css"]
})
export class UserFollowingComponent implements OnInit {
  @Input() user;

  listOfFollowing: any;
  faAddressBook = faAddressBook;

  constructor(
    private userProfileService: UserProfileServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFollowingList(this.user);
  }

  getFollowingList(user) {
    this.userProfileService.getFollowingList(user).subscribe(
      res => {
        this.listOfFollowing = res;
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
