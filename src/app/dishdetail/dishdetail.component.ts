import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import { SearchService } from "../services/search.service";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
  animations: [ flyInOut(), expand() ]
})
export class DishdetailComponent implements OnInit {
    errMess: string;
    dish: Dish;
    restId: number;
    dishId: number;
    
      constructor(private searchService: SearchService,
        private route: ActivatedRoute,
        private location: Location,
        @Inject('BaseURL') private BaseURL) { 
      }
        
      ngOnInit() { 
        this.route.params.pipe(switchMap((params: Params) => {
            this.restId = params['restId'];
            this.dishId = params['dishId'];
            return this.searchService.getRestaurant(+this.restId); }))
                .subscribe(restaurant => {console.log(restaurant); this.dish = restaurant.dishes.filter(dish => dish.id == this.dishId)[0]; }, errmess => this.errMess = <any>errmess);
      }

}
