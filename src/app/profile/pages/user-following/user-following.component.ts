import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { MatDialog } from '@angular/material';
import { DialogFollowingComponent } from '../../dialogs/dialog-following/dialog-following.component';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
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
    private profileService: ProfileService,
    private dialog: MatDialog,
    private modalService: NgbModal
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
    const MODALREF = this.modalService.open(DialogFollowingComponent);
    MODALREF.componentInstance.follow = following;
  }

}
