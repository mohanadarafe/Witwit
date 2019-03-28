import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { DialogFollowingComponent } from '../../dialogs/dialog-following/dialog-following.component';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent implements OnInit {
  listOfFollowers: any;

  faAddressBook = faAddressBook;

  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal
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
    const MODALREF = this.modalService.open(DialogFollowingComponent);
    MODALREF.componentInstance.follow = following;
  }
}
