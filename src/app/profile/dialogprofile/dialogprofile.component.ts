import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-dialogprofile",
  templateUrl: "./dialogprofile.component.html",
  styleUrls: ["./dialogprofile.component.css"]
})
export class DialogprofileComponent implements OnInit {
  likers: any;
  wit: any;
  faTimes = faTimes;

  constructor(
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<DialogprofileComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.wit = data.wit_id;
  }

  ngOnInit() {
    this.showAll(this.wit);
  }

  showAll(id: number) {
    const likeObj = { wit_id: id };
    this.profileService.getLikesList(likeObj).subscribe(
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
