import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'films', component: ItemListComponent },
   { path: 'characters', component: ItemListComponent },
   { path: 'planets', component: ItemListComponent },
];
