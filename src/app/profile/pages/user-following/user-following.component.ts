import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { MatDialog } from '@angular/material';
import { DialogFollowingComponent } from '../../dialogs/dialog-following/dialog-following.component';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'

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
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFollowingList();
  }

  getFollowingList() {
    this.profileService.getFollowingList().subscribe(
      res => {
        this.listOfFollowing = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  openDialogFollowing(following: any) {
    this.dialog.open(DialogFollowingComponent, {
      data: { follow: following },
      width: '30%'
    });
  }
  
}
