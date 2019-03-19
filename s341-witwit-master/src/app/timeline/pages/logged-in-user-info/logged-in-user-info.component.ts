import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logged-in-user-info',
  templateUrl: './logged-in-user-info.component.html',
  styleUrls: ['./logged-in-user-info.component.css']
})
export class LoggedInUserInfoComponent implements OnInit {

  @Input() userData;

  constructor() { }

  ngOnInit() {
  }

}
