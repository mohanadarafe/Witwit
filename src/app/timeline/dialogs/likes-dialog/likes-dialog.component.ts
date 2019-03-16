import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { TimelineService } from "../../services/timeline.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-likes-dialog",
  templateUrl: "./likes-dialog.component.html",
  styleUrls: ["./likes-dialog.component.css"]
})
export class DialogComponent implements OnInit {
  likers: any;
  wit: any;
  faTimes = faTimes;

  constructor(
    private timelineService: TimelineService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.wit = data.wit_id;
  }

  ngOnInit() {
    this.showAll(this.wit);
  }

  showAll(id: number) {
    const likeObj = { wit_id: id };
    this.timelineService.getLikesList(likeObj).subscribe(
      res => {
        this.likers = res;
      },
      err => console.log(err)
    );
  }

  close() {
    this.dialogRef.close();
  }
}
