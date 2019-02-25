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

  constructor(private route: ActivatedRoute, private auth : AuthService) {
    this.route.params.subscribe(params => {
      this.user['username'] = this.route.snapshot.paramMap.get("p1");
      this.requestUsers();
    });
  }

  ngOnInit() {
  }
  

  requestUsers() {
    this.auth.requestUsers(this.user).subscribe(
      res => {console.log(res)},
      err => {console.log(err)},
      () => {console.log("The search has been completed")},
      
    );
  }
}
