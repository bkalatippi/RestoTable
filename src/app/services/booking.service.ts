import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Booking } from "../shared/booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

    constructor(private http: HttpClient,
            private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  submitBooking(booking: Booking): Observable<Booking> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })};
      return this.http.post<Booking>(baseURL + 'bookings/', booking, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
