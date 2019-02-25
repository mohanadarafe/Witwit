import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  user={};
  users=[];
  hidden: boolean;
  constructor(private route: ActivatedRoute, private auth : AuthService) {
    this.route.params.subscribe(params => {
      this.user['username'] = this.route.snapshot.paramMap.get("p1");
      this.requestUsers(this.hidden);
      console.log(this.users.length)
      console.log(this.users)
      console.log(this.hidden)
    });
  }

  ngOnInit() {
  }
  

  requestUsers(hidden) {
    this.auth.requestUsers(this.user).subscribe(
      res => {this.users=res, this.hidden=false},
      err => {console.log(err), this.hidden=true},
      () => {console.log("The search has been completed")},
      
    );
  }
}
