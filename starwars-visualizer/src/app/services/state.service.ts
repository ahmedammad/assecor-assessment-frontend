import { Injectable, signal, WritableSignal } from '@angular/core';
import { Film } from '../types/film';
import { Character } from '../types/character';
import { Planet } from '../types/planet';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedFilm = signal<Film | null>(null);
  films = signal<Film[] | null>(null);

  selectedCharacter = signal<Character | null>(null);
  characters = signal<Character[] | null>(null);

  selectedPlanet = signal<Planet | null>(null);
  planets = signal<Planet[] | null>(null);

  updateItems<T extends { url: string }>(signal: WritableSignal<T[] | null>, newItems: T[]): void {
    const currentItems = signal() || [];
    const updatedItems = [...currentItems];

    newItems.forEach(newItem => {
      if (!currentItems.some(item => item.url === newItem.url)) {
        updatedItems.push(newItem);
      }
    });

    signal.set(updatedItems);
  }

}