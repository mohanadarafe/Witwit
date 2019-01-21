import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from '../timeline/timeline.module';
import { ProfileComponent } from './pages/profile.component';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    TimelineModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
