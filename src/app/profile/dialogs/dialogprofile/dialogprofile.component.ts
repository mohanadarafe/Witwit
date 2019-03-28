import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-dialogprofile',
  templateUrl: './dialogprofile.component.html',
  styleUrls: ['./dialogprofile.component.css']
})
export class DialogprofileComponent implements OnInit {
  likers: any;
  @Input() wit: any;
  @Input() reply: any;

  faTimes = faTimes;

  constructor(
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    if (this.wit) {
      this.showWitLikes(this.wit.wit_id);
      } else {
       this.showReplyLikes(this.reply.reply_id);
     }
  }

  // Retrieve the list of likes for a wit:
  showWitLikes(id: number) {
    const LIKEOBJ = { wit_id: id };
    this.profileService.getLikesList(LIKEOBJ).subscribe(
      res => {
        this.likers = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }
  // Retrieve the list of likes for a reply:
  showReplyLikes(id: number) {
    const LIKEOBJ = { reply_id: id };
    this.profileService.getReplyLikesList(LIKEOBJ).subscribe(
      res => {
        this.likers = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
