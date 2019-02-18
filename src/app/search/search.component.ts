import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { City } from "../shared/city";
import { SearchService } from "../services/search.service";
import { Restaurant } from "../shared/restaurant";
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { Search } from "../shared/search";
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
  animations: [ flyInOut(), expand() ]
})

export class SearchComponent implements OnInit {
  
  restaurants: Restaurant[];
  search = new Search();
  searchErrMess: string;

  constructor(private serchService: SearchService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private BaseURL) {}

  ngOnInit() {
      this.route.queryParams.pipe(switchMap((params: Params) => {
          //check if query params are undefined; if yes, initialize
          if(!params.city){
              this.search.city = '';
          }else{
              this.search.city = params.city;
          }
          if(!params.q){
              this.search.searchText = '';
          }else{
              this.search.searchText = params.q;
          }
          return this.serchService.getRestaurants(this.search); }))
              .subscribe(restaurants => {this.restaurants = restaurants}, errmess => {this.searchErrMess = <any>errmess;})
  }
  
  goBack(): void {
      this.location.back();
  }
  
  showPhoneNumber(restname: string, phone: string){
      alert('Phone numbers for:'+ restname +'\n\n'+ phone);
  }
}
