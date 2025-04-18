import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '../types/film';
import { catchError, Observable, throwError } from 'rxjs';
import { Character } from '../types/character';
import { Planet } from '../types/planet';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'https://swapi.info/api';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/films`).pipe(
      catchError(this.handleError)
    );
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.apiUrl}/people`).pipe(
      catchError(this.handleError)
    );
  }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(`${this.apiUrl}/planets`).pipe(
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
