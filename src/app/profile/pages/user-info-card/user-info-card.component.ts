import { Component, OnInit, Input } from "@angular/core";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { EditprofileDialogComponent } from "../../dialogs/editprofile-dialog/editprofile-dialog.component";
import { ProfileComponent} from '../profile.component';
import { TimelineService } from '../../../timeline/services/timeline.service';

@Component({
  providers: [ProfileComponent],
  selector: "app-user-info-card",
  templateUrl: "./user-info-card.component.html",
  styleUrls: ["./user-info-card.component.css"]
})
export class UserInfoCardComponent implements OnInit {
  @Input() userData;

  constructor(private dialog: MatDialog, private profile: ProfileComponent, private timelineService: TimelineService) {}

  ngOnInit() {}


  getUser() {
    //Populate the profile with the current user informations
    this.timelineService.requestUserData().subscribe(
      res => {
        this.userData = res[0];
      },
      err => console.error(err)
    );
  }

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
    const dialog = this.dialog.open(EditprofileDialogComponent, dialogConfig);
    dialog.afterClosed().subscribe( result =>{
      this.getUser();
  });
}
}
