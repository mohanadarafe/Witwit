import { Component, OnInit, Input } from "@angular/core";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { EditprofileDialogComponent } from "../../dialogs/editprofile-dialog/editprofile-dialog.component";

@Component({
  selector: "app-user-info-card",
  templateUrl: "./user-info-card.component.html",
  styleUrls: ["./user-info-card.component.css"]
})
export class UserInfoCardComponent implements OnInit {
  @Input() userData;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
    this.dialog.open(EditprofileDialogComponent, dialogConfig);
  }
}
