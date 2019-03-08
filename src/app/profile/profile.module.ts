import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from '../timeline/timeline.module';
import { ProfileComponent } from './pages/profile.component';
import { MaterialModule } from '../shared/modules/material-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogprofileComponent } from './dialogprofile/dialogprofile.component';
import { DialogFollowingComponent } from './dialog-following/dialog-following.component';
import { EditprofileDialogComponent } from './editprofile-dialog/editprofile-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ProfileComponent,
    DialogprofileComponent,
    DialogFollowingComponent,
    EditprofileDialogComponent,  
    
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
  

  ]
})
export class ProfileModule { }
