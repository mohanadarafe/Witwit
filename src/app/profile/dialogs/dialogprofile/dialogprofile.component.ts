import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ProfileService } from '../../services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-dialogprofile",
  templateUrl: "./dialogprofile.component.html",
  styleUrls: ["./dialogprofile.component.css"]
})
export class DialogprofileComponent implements OnInit {
  likers: any;
  @Input() wit: any;
  faTimes = faTimes;

  constructor(
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.showAll(this.wit.reply_id);
  }

  showAll(id: number) {
    const likeObj = { wit_id: id };    
    this.profileService.getLikesList(likeObj).subscribe(
      res => {
        this.likers = res;
        console.log(this.likers);
        
      },
      err => console.error(err)
    );
  }

  close() {
    // this.dialogRef.close();
  }
}
