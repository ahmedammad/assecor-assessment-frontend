import { computed, inject, Injectable, Signal } from '@angular/core';
import { catchError, delay, forkJoin, map, Observable, of, startWith } from 'rxjs';
import { Film } from '../../types/film';
import { ItemService } from '../rest/item.service';

export interface FilmsView {
  items: Film[];
  isLoading: boolean;
  error: string | null;
  showAll: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private itemService = inject(ItemService);

  getFilmsView$(films: string[]): Observable<FilmsView> {
    return computed(() => {

      if (!films || !films?.length) {
        return of({ items: [], isLoading: false, error: null, showAll: false });
      }

      const films$ = films.map(url =>
        this.itemService.getFilmByUrl(url).pipe(
          catchError(() => of(null))
        )
      );

      return forkJoin(films$).pipe(
        map(films => ({
          items: films.filter((f): f is Film => f !== null),
          isLoading: false,
          error: films.every(f => f === null) ? 'Failed to load films' : null,
          showAll: false
        })),
        delay(2000),
        startWith({ items: [], isLoading: true, error: null, showAll: false }),
        catchError(() => of({ items: [], isLoading: false, error: 'Failed to load films', showAll: false }))
      );
    })();
  }

}
