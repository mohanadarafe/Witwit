import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from '../timeline/timeline.module';
import { ProfileComponent } from './pages/profile.component';
import { MaterialModule } from '../shared/modules/material-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogprofileComponent } from './dialogs/dialogprofile/dialogprofile.component';
import { DialogFollowingComponent } from './dialogs/dialog-following/dialog-following.component';
import { EditprofileDialogComponent } from './dialogs/editprofile-dialog/editprofile-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordDialogComponent } from './dialogs/password-dialog/password-dialog.component';
import { DialogRepliesComponent } from '../timeline/dialogs/dialog-replies/dialog-replies.component';
import { UserInfoCardComponent } from './pages/user-info-card/user-info-card.component';
import { UserWitsComponent } from './pages/user-wits/user-wits.component';
import { UserLikesComponent } from './pages/user-likes/user-likes.component';
import { UserFollowersComponent } from './pages/user-followers/user-followers.component';
import { UserFollowingComponent } from './pages/user-following/user-following.component';
import { ProfilePictureComponent } from './dialogs/profile-picture/profile-picture.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DialogprofileComponent,
    DialogFollowingComponent,
    EditprofileDialogComponent,
    PasswordDialogComponent,
    UserInfoCardComponent,
    UserWitsComponent,
    UserLikesComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    ProfilePictureComponent
  ],
  imports: [
    CommonModule,
    TimelineModule, // why is this here? What's the purpose of this?
    MaterialModule,
    MatDialogModule,
    BrowserModule,
    ReactiveFormsModule, //was FormsModule
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule, // required animations module
  ],
  exports: [
    ProfileComponent,
    MatDialogModule
  ],

  entryComponents: [
    DialogprofileComponent,
    DialogFollowingComponent,
    EditprofileDialogComponent,
    DialogRepliesComponent 
  ]
})
export class ProfileModule { }
