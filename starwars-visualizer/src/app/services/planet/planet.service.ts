import { computed, inject, Injectable } from '@angular/core';
import { ItemService } from '../rest/item.service';
import { catchError, delay, forkJoin, map, Observable, of, startWith } from 'rxjs';
import { Planet } from '../../types/planet';

export interface PlanetsView {
  items: Planet[];
  isLoading: boolean;
  error: string | null;
  showAll: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private itemService = inject(ItemService);

  getPlanetsView$(planets: string[]): Observable<PlanetsView> {
    return computed(() => {

      if (!planets || !planets?.length) {
        return of({ items: [], isLoading: false, error: null, showAll: false });
      }

      const planets$ = planets.map(url =>
        this.itemService.getPlanetByUrl(url).pipe(
          catchError(() => of(null))
        )
      );

      return forkJoin(planets$).pipe(
        map(planets => ({
          items: planets.filter((p): p is Planet => p !== null),
          isLoading: false,
          error: planets.every(p => p === null) ? 'Failed to load planets' : null,
          showAll: false
        })),
        delay(2000),
        startWith({ items: [], isLoading: true, error: null, showAll: false }),
        catchError(() => of({ items: [], isLoading: false, error: 'Failed to load planets', showAll: false }))
      );
    })();
  }
}
