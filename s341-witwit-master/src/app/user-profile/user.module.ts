import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from '../timeline/timeline.module';
import { MaterialModule } from '../shared/modules/material-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UserProfileComponent } from './pages/user-profile.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UserWitsComponent } from './pages/user-wits/user-wits.component';
import { UserLikesComponent } from './pages/user-likes/user-likes.component';
import { UserFollowingComponent } from './pages/user-following/user-following.component';
import { UserFollowersComponent } from './pages/user-followers/user-followers.component';




@NgModule({
  declarations: [
    UserProfileComponent,
    UserInfoComponent,
    UserWitsComponent,
    UserLikesComponent,
    UserFollowingComponent,
    UserFollowersComponent
  ],
  imports: [
    CommonModule,
    TimelineModule, // why is this here? What's the purpose of this?
    MaterialModule,
    MatDialogModule,
    BrowserModule,//was CommonModule
    ReactiveFormsModule, //was FormsModule
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule


  ],
  exports: [
    MatDialogModule,
    UserProfileComponent
  ],

  entryComponents: [
  ]
})
export class UserModule { }
