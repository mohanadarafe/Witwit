import { Component, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ProfileService } from '../../services/profile.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dialog-following',
  templateUrl: './dialog-following.component.html',
  styleUrls: ['./dialog-following.component.css']
})
export class DialogFollowingComponent implements OnInit {

  follow: any; 
  listOfFollowing: any;
  faTimes = faTimes;

  constructor(
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<DialogFollowingComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.follow = data.follow;
  }
  ngOnInit() {
    this.getFollowingOfFollowing(this.follow);
  }
  getFollowingOfFollowing(follow){
    var objFollow = {username: follow}
    this.profileService.getFollowingOfFollowing(objFollow).subscribe(
      res=> { this.listOfFollowing =res;},
      err => { console.error(err);}
    );
  }


  close() {
    this.dialogRef.close();
  }
}
