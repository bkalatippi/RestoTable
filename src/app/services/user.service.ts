import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../shared/user";
import { baseURL } from "../shared/baseurl";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient,
            private processHTTPMsgService: ProcessHTTPMsgService) { }
  
    getUserByUsername(username: string): Observable<User>{
      return this.http.get<User>(baseURL + 'users?username='+username).pipe(map(users => users[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
