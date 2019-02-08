import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  postWit(wit: Object) {
    return this.http.post<any>('http://localhost:3002/routes/witPost/witPost', wit);
  }
  pullWit() {
    console.log("I am here ");
    console.log(this.http.get<any>('http://localhost:3002/routes/timeline/timeline'));
    return this.http.get<any>('http://localhost:3002/routes/timeline/timeline');
  }
}
