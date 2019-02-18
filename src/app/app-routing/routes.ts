import { Routes } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from "../home/home.component";
import { SearchComponent } from "../search/search.component";
import { MenuComponent } from "../menu/menu.component";
import { DishdetailComponent } from "../dishdetail/dishdetail.component";
import { BookComponent } from "../book/book.component";

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'restaurants',  component: SearchComponent, data: {city: '', q: ''}},
  { path: 'restaurants/:id',  component: MenuComponent},
  { path: 'book/:restId',  component: BookComponent},
  { path: 'dishdetail/:restId/:dishId',     component: DishdetailComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];