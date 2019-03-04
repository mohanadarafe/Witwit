import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search = faSearch;
  hidden: boolean;
  searchedUser: string;

  constructor(private _router: Router) {
    this.hidden = false;
   }

  ngOnInit() {
  }

  setSearch(searchedUser){
    if(searchedUser==''){
      this._router.navigate(['search', {p1: 'heyy'}]);
    }
    this.searchedUser=searchedUser;
    this._router.navigate(['search', {p1: this.searchedUser}]);
  }

  toggleInput() {
    this.hidden = !this.hidden;
  }

}
