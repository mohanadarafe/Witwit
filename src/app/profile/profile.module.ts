import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from '../timeline/timeline.module';
import { ProfileComponent } from './pages/profile.component';
import { MaterialModule } from '../shared/modules/material-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogprofileComponent } from './dialogprofile/dialogprofile.component';
import { DialogeditprofileComponent } from './dialogeditprofile/dialogeditprofile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DialogprofileComponent,
    DialogeditprofileComponent

    
  ],
  imports: [
    CommonModule,
    TimelineModule, // why is this here? What's the purpose of this?
    MaterialModule,
    MatDialogModule
    
  ],
  exports: [
    ProfileComponent,
    MatDialogModule
  
  ],

  entryComponents: [
    DialogprofileComponent,
    DialogeditprofileComponent
  ]
})
export class ProfileModule { }
