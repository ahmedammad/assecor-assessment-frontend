import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Film } from '../../types/film';
import { catchError, Observable, throwError } from 'rxjs';
import { Character } from '../../types/character';
import { Planet } from '../../types/planet';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'https://swapi.info/api';

  http = inject(HttpClient);

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}/films`).pipe(
      catchError(this.handleError)
    );
  }

  getFilmByUrl(apiUrl: string): Observable<Film> {
    return this.http.get<Film>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/people`).pipe(
      catchError(this.handleError)
    );
  }

  getCharacterByUrl(apiUrl: string): Observable<Character> {
    return this.http.get<Character>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(`${this.baseUrl}/planets`).pipe(
      catchError(this.handleError)
    );
  }

  getPlanetByUrl(apiUrl: string): Observable<Planet> {
    return this.http.get<Planet>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    let errorMessage = 'An unexpected error occurred';

    if (error.status === 404) {
      errorMessage = 'Sorry, data not found';
    } else if (error.status >= 500) {
      errorMessage = 'Server error, please try again later';
    }

    console.error('---- API Error---- :', error);

    return throwError(() => new Error(errorMessage));
  }

}
