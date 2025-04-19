import { Injectable, signal } from '@angular/core';
import { Film } from '../types/film';
import { Character } from '../types/character';
import { Planet } from '../types/planet';

@Injectable({
  providedIn: 'root'
})

export class StateService {

  constructor() { }

  selectedFilm = signal<Film | null>(null);

  selectedCharacter = signal<Character | null>(null);

  selectedPlanet = signal<Planet | null>(null);

}
