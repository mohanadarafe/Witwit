import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../../services/profile.service";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { DialogFollowingComponent } from "../../dialogs/dialog-following/dialog-following.component";

@Component({
  selector: "app-user-followers",
  templateUrl: "./user-followers.component.html",
  styleUrls: ["./user-followers.component.css"]
})
export class UserFollowersComponent implements OnInit {
  listOfFollowers: any;
  faAddressBook = faAddressBook;

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFollowerList();
  }

  getFollowerList() {
    this.profileService.getFollowerList().subscribe(
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
