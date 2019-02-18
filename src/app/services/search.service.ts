import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { City } from "../shared/city";
import { Restaurant } from "../shared/restaurant";
import { Search } from "../shared/search";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) { }
    
    getCities(): Observable<City[]> {
        return this.http.get<City[]>(baseURL + 'cities').pipe(catchError(this.processHTTPMsgService.handleError));
    }
    
    getRestaurants(search: Search): Observable<Restaurant[]> {
        let url = 'restaurants';
        if(search.city === '' && search.searchText !== ''){
            url = url + '?name='+search.searchText;
        }else if(search.city !== '' && search.searchText === ''){
            url = url + '?address.city='+ search.city;
        }else if(search.city !== '' && search.searchText !== ''){
            url = url + '?address.city='+ search.city +'&name='+search.searchText;
        }
        return this.http.get<Restaurant[]>(baseURL + url).pipe(catchError(this.processHTTPMsgService.handleError));
    }
    
    getRestaurant(restId: number): Observable<Restaurant> {
        console.log(restId);
        return this.http.get<Restaurant>(baseURL + 'restaurants/'+restId)
          .pipe(catchError(this.processHTTPMsgService.handleError));
      }
}
