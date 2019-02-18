import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animation';
import { City } from "../shared/city";
import { SearchService } from "../services/search.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { Search } from "../shared/search";
import { Restaurant } from "../shared/restaurant";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
  animations: [ flyInOut(), expand() ]
})
export class HomeComponent implements OnInit {
  
  cities: City[];
  errMess: string;

  constructor(
    private serchService: SearchService,
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('BaseURL') private BaseURL) { 
      this.createForm();
  }
  
    searchForm: FormGroup;
    search: Search;
    searchCopy: Search;
    searchErrMess: string;
    restaurants: Restaurant[]
    @ViewChild('sform') feedbackFormDirective;

  ngOnInit() {
      this.serchService.getCities().subscribe(cities => this.cities = cities, errmess => this.errMess = <any>errmess);
   }
  
  onSubmit() {
      this.search = this.searchForm.value;
      console.log(this.search);
      this.searchCopy = this.search;
      
      //do search
      //this.serchService.getRestaurants(this.search).subscribe(restaurants => {this.restaurants = restaurants;this.search=null}, errmess => {this.searchErrMess = <any>errmess;})
      this.router.navigate(['restaurants'], { queryParams: { city: this.search.city, q: this.search.searchText}});
      
      this.searchForm.reset({
          city: '',
          searchText: '',
      });
      this.feedbackFormDirective.resetForm({
          city: '',
          searchText: '',
      });
   }
  
  createForm() : void{
      this.searchForm = this.fb.group({
          city: '',
          searchText: ''
      });
      this.search = this.searchForm.value;
  }
}
