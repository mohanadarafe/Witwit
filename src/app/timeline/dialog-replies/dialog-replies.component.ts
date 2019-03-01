import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { TimelineService } from '../services/timeline.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-dialog-replies',
  templateUrl: './dialog-replies.component.html',
  styleUrls: ['./dialog-replies.component.css']
})
export class DialogRepliesComponent implements OnInit {
  wit: any;
  faTimes = faTimes;
  replies: any;

  constructor(
    private timelineService: TimelineService,
    private dialogRef: MatDialogRef<DialogRepliesComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.wit = data;
  }
  ngOnInit() {
   this.showAll(this.wit);
  }
  showAll(id) {

    this.timelineService.repliesList(id).subscribe(
      res => {
        this.replies = res;
        console.log(this.replies);
       },
       err => console.log(err)
     );
   }


  close() {
    this.dialogRef.close();
  }
}
