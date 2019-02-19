import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { SearchService } from "../services/search.service";
import { Restaurant } from "../shared/restaurant";

@Injectable({
  providedIn: 'root'
})
export class DishService {
    
    restaurant: Restaurant;
    dishes: Dish[];
    errMess: string;
    
      constructor(private http: HttpClient,
        private searchService: SearchService,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

      getDishes(restId: number): Observable<Dish[]> {
          this.searchService.getRestaurant(restId).subscribe(restaurant => {this.restaurant = restaurant; this.dishes = restaurant.dishes}, errmess => this.errMess = <any>errmess);
          return of(this.restaurant.dishes);
      }
}
