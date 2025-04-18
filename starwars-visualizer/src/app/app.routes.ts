import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmListComponent } from './film-list/film-list.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'films', component: FilmListComponent },
   // { path: 'characters', component: ItemListComponent },
   // { path: 'planets', component: ItemListComponent },
];
