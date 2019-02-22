import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from '../timeline/timeline.module';
import { ProfileComponent } from './pages/profile.component';
import { MaterialModule } from '../shared/modules/material-module.component';




@NgModule({
  declarations: [
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    TimelineModule, // why is this here? What's the purpose of this?
    MaterialModule,
    
  ],
  exports: [
    ProfileComponent,
  
  ],

  entryComponents: [
    
  ]
})
export class ProfileModule { }
