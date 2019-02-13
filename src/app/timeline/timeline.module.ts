import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './pages/timeline.component';
import { MaterialModule } from '../shared/modules/material-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog/dialog.component';

@NgModule({
  declarations: [
    TimelineComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    TimelineComponent,
    MatDialogModule
  ]
})
export class TimelineModule { }
