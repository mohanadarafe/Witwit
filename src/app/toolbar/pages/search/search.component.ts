import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search = faSearch;
  hidden: boolean;

  constructor() {
    this.hidden = false;
   }

  ngOnInit() {
  }

  toggleInput() {
    this.hidden = !this.hidden;
  }

}
