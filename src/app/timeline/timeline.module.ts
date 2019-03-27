import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './pages/timeline.component';
import { MaterialModule } from '../shared/modules/material-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialogs/likes-dialog/likes-dialog.component';
import { LoggedInUserInfoComponent } from './pages/logged-in-user-info/logged-in-user-info.component';
import { PostWitTextboxComponent } from './pages/post-wit-textbox/post-wit-textbox.component';
import { ListOfWitsComponent } from './pages/list-of-wits/list-of-wits.component';
import { DialogRepliesLikesComponent } from './dialogs/dialog-replies/dialog-replies-likes/dialog-replies-likes.component';
import { DialogRepliesComponent } from './dialogs/dialog-replies/dialog-replies.component';
import { WitDialogComponent } from './dialogs/wit-dialog/wit-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TimelineComponent,
    DialogComponent,
    DialogRepliesComponent,
    DialogRepliesLikesComponent,
    LoggedInUserInfoComponent,
    PostWitTextboxComponent,
    ListOfWitsComponent,
    WitDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    NgbModule
  ],
  exports: [
    TimelineComponent,
    MatDialogModule
  ],
  entryComponents: [
    DialogComponent,
    DialogRepliesComponent,
    DialogRepliesLikesComponent,
    WitDialogComponent
  ]
})
export class TimelineModule { }
