import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './pages/timeline.component';
import { MaterialModule } from '../shared/modules/material-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog/dialog.component';
import { DialogRepliesComponent } from './dialog-replies/dialog-replies.component';
import { DialogLikesComponent } from './dialog-replies/dialog-likes/dialog-likes.component';

@NgModule({
  declarations: [
    TimelineComponent,
    DialogComponent,
    DialogRepliesComponent,
    DialogLikesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    TimelineComponent,
    MatDialogModule
  ],
  entryComponents: [
    DialogComponent,
    DialogRepliesComponent,
    DialogLikesComponent
  ]
})
export class TimelineModule { }
