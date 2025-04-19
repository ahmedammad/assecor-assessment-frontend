import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmListComponent } from './film-list/film-list.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: 'films',
      children: [
         { path: '', component: FilmListComponent },
         { path: 'detail', component: FilmDetailComponent }
      ]
   },
   { path: 'characters', component: CharacterListComponent },
   { path: 'planets', component: PlanetListComponent },
];
