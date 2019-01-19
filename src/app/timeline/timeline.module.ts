import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './pages/timeline.component';
import { MaterialModule } from '../shared/modules/material-module.component';

@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class TimelineModule { }
