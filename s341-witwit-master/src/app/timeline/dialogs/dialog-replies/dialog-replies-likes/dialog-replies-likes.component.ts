import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DialogRepliesComponent } from '../dialog-replies.component';
import { TimelineService } from 'src/app/timeline/services/timeline.service';

@Component({
  selector: 'app-dialog-replies-likes',
  templateUrl: './dialog-replies-likes.component.html',
  styleUrls: ['./dialog-replies-likes.component.css']
})
export class DialogRepliesLikesComponent implements OnInit {
  likers: any;
  reply: any;
  faTimes = faTimes;

  constructor(
    private timelineService: TimelineService,
    private dialogRef: MatDialogRef<DialogRepliesComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.reply = data.reply_id;
  }

  ngOnInit() {
    this.showAll(this.reply);
  }

  showAll(id: number) {
    const likeObj = { reply_id: id };
    this.timelineService.getReplyLikeList(likeObj).subscribe(
      res => {
        console.log(res);
        this.likers = res;
      },
      err => console.log(err)
    );
  }

  close() {
    this.dialogRef.close();
  }
}
