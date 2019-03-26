import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private userDynSearch = 'http://localhost:3002/routes/main_pages/searchEngine/dropDownList';

  constructor(private http: HttpClient) { }

  dropDownUsers(user) {
    return this.http.post<any>(this.userDynSearch, user);
  }
}
