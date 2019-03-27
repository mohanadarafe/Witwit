import { Component, OnInit, Input } from '@angular/core';
import { UserProfileServiceService } from '../../services/user-profile-service.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogFollowingComponent } from 'src/app/profile/dialogs/dialog-following/dialog-following.component';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent implements OnInit {
  @Input() user;

  listOfFollowers: any;

  faAddressBook = faAddressBook;

  constructor(
    private userProfileService: UserProfileServiceService,
    private modalService: NgbModal,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFollowerList(this.user);
  }

  // Get the list of followers:
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
    const MODALREF = this.modalService.open(DialogFollowingComponent);
    MODALREF.componentInstance.follow = following;
  }
}
