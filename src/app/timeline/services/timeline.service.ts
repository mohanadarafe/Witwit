import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  postWit(wit: Object) {
    console.log(wit);
    return this.http.post<any>('http://localhost:3002/routes/witPost/witPost', wit);
  }
}
