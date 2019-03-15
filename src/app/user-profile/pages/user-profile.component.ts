import { Component, OnInit} from '@angular/core';
import { MatSnackBar, MatDialogActions } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserProfileServiceService } from '../services/user-profile-service.service';
import { faHeart, faThumbsUp, faTrashAlt, faAddressBook } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  witObject = {};
  // @ViewChild("witPost") witPost: ElementRef;
  userWits: any;
  userData: any;
  faHeart = faHeart;
  faTrashAlt = faTrashAlt;
  faThumbsUp = faThumbsUp;
  faAddressBook = faAddressBook;
  likesListProfile = [];
  likesOfWits: any;
  listOfFollowing: any;
  user: any;
  constructor(
    private userProfileService: UserProfileServiceService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.sendUserToken();

  }
  sendUserToken() {
     const user = { username: 'Hampic'};
  //Populate the profile with the current user informations
    this.userProfileService.requestUserLoggedIn().subscribe(
      res => {
        this.userData = res;
      },
      err => console.error(err)
    );
  }
  //getUserInfo(){}

}
