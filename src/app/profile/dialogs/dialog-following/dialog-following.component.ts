import { Component, OnInit, Input } from '@angular/core';
// import { Inject } from "@angular/core";
// import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProfileService } from '../../services/profile.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserProfileServiceService } from '../../../user-profile/services/user-profile-service.service';

@Component({
  selector: 'app-dialog-following',
  templateUrl: './dialog-following.component.html',
  styleUrls: ['./dialog-following.component.css']
})
export class DialogFollowingComponent implements OnInit {
  @Input() follow: any;
  listOfFollowing: any;
  faTimes = faTimes;

  constructor(
    private userProfileService: UserProfileServiceService
  ) { }

  ngOnInit() {
    this.getFollowing(this.follow);
  }

  getFollowing(follow) {
    const objFollow = { username: follow };
    this.userProfileService.getFollowingList(objFollow).subscribe(
      res => {
        this.listOfFollowing = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  close() {
    // this.dialogRef.close();
  }
}
