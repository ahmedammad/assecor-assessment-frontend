import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmListComponent } from './film/film-list/film-list.component';
import { CharacterListComponent } from './character/character-list/character-list.component';
import { PlanetListComponent } from './planet/planet-list/planet-list.component';
import { FilmDetailComponent } from './film/film-detail/film-detail.component';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';
import { PlanetDetailComponent } from './planet/planet-detail/planet-detail.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: 'films',
      children: [
         { path: '', component: FilmListComponent },
         { path: 'detail', component: FilmDetailComponent }
      ]
   },
   {
      path: 'characters',
      children: [
         { path: '', component: CharacterListComponent },
         { path: 'detail', component: CharacterDetailComponent }
      ]
   },
   {
      path: 'planets',
      children: [
         { path: '', component: PlanetListComponent },
         { path: 'detail', component: PlanetDetailComponent }
      ]
   },
];
