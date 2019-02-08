import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TimelineService } from "../services/timeline.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  witObject = {};
  @ViewChild('witPost') witPost: ElementRef;
  wits: any;

  constructor(private timelineService: TimelineService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.timelineService.pullWit().subscribe(
      res => {
        this.wits = res;
        console.log(this.wits);
      },
      err => console.log("error")
    );
  }

  submitWit(value: string) {
    this.witObject["wit"] = value;
    this.timelineService.postWit(this.witObject).subscribe(
      res => {
        this.witPost.nativeElement.value = '';
          this.snackBar.open('Wit posted successfully', 'ok', {
            duration: 3000,
          });
      },
      err => {
        this.snackBar.open('Error posting wit', 'ok', {
          duration: 3000,
        });
        console.error(err)}
    );
  }
}
