import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private timelineURL = 'http://localhost:3002/routes/timeline/timeline';
  private witPostURL = 'http://localhost:3002/routes/witPost/witPost';
  private timelineProfileURL = 'http://localhost:3002/routes/timelineProfile/timelineProfile';

  constructor(private http: HttpClient) { }

  postWit(wit: Object) {
    return this.http.post<any>(this.witPostURL, wit);
  }

  //Get the wits from the backend
  pullWit() {
    return this.http.get<any>(this.timelineURL);
  }

   //Get the user informations from the backend
  requestUserData (){
    return this.http.get<any>(this.timelineProfileURL);
  }
}
