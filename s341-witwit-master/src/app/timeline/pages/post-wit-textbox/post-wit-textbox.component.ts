import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { TimelineService } from '../../services/timeline.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-post-wit-textbox",
  templateUrl: "./post-wit-textbox.component.html",
  styleUrls: ["./post-wit-textbox.component.css"]
})
export class PostWitTextboxComponent implements OnInit {

  @ViewChild('witPost') witPost: ElementRef; // Getting the value from the textbox in the html
  @Output() refreshWits = new EventEmitter<any>();

  constructor(private timelineService: TimelineService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {}

  postWit(value: string) {
    const userToken = localStorage.getItem('token');
    // witObject will contain the wit posted ("wit") is the key
    const witObject = {
      wit   : value,
      token : userToken
    };

    this.timelineService.postWit(witObject).subscribe(
      res => {
        this.witPost.nativeElement.value = "";
        this.snackBar.open("Wit posted successfully", "ok", {
          duration: 3000
        });
        this.refreshWits.emit();
      },
      err => {
        this.snackBar.open("Error posting wit", "ok", {
          duration: 3000
        });
        console.error(err);
      }
    );
  }
}
