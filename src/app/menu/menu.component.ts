import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchService } from "../services/search.service";
import { Restaurant } from "../shared/restaurant";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
  animations: [ flyInOut(), expand() ]
})
export class MenuComponent implements OnInit {
    
    dishes: Dish[];
    restaurant: Restaurant;
    errMess: string;

    constructor(private dishService: DishService,
        private searchService: SearchService,
        private route: ActivatedRoute,
        private location: Location,
        @Inject('BaseURL') private BaseURL) { }

    ngOnInit() {
        this.route.params.pipe(switchMap((params: Params) => {return this.searchService.getRestaurant(+params['id']); }))
            .subscribe(restaurant => {this.restaurant = restaurant; this.dishes = restaurant.dishes}, errmess => {this.errMess = <any>errmess;})
    }
}
