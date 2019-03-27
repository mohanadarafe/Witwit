import { Component, OnInit, Input } from '@angular/core';
import { UserProfileServiceService } from '../../services/user-profile-service.service';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogFollowingComponent } from 'src/app/profile/dialogs/dialog-following/dialog-following.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
export class UserFollowingComponent implements OnInit {
  @Input() user;

  listOfFollowing: any;
  faAddressBook = faAddressBook;

  constructor(
    private modalService: NgbModal,
    private userProfileService: UserProfileServiceService
  ) {}

  ngOnInit() {
    this.getFollowingList(this.user);
  }

  // Get the list of following for the current user:
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

  // open a dialog with the list of following:
  openDialogFollowing(following: any) {
    const MODALREF = this.modalService.open(DialogFollowingComponent);
    MODALREF.componentInstance.follow = following;
  }
}
