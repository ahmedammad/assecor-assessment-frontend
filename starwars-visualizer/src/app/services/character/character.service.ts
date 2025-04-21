import { computed, inject, Injectable } from '@angular/core';
import { Character } from '../../types/character';
import { ItemService } from '../rest/item.service';
import { catchError, delay, forkJoin, map, Observable, of, startWith } from 'rxjs';

export interface CharactersView {
  items: Character[];
  isLoading: boolean;
  error: string | null;
  showAll: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private itemService = inject(ItemService);

  getCharactersView$(characters: string[]): Observable<CharactersView> {
    return computed(() => {

      if (!characters || !characters?.length) {
        return of({ items: [], isLoading: false, error: null, showAll: false });
      }

      const filmObservables = characters.map(url =>
        this.itemService.getCharacterByUrl(url).pipe(
          catchError(() => of(null))
        )
      );

      return forkJoin(filmObservables).pipe(
        map(characters => ({
          items: characters.filter((c): c is Character => c !== null),
          isLoading: false,
          error: characters.every(c => c === null) ? 'Failed to load characters' : null,
          showAll: false
        })),
        delay(2000),
        startWith({ items: [], isLoading: true, error: null, showAll: false }),
        catchError(() => of({ items: [], isLoading: false, error: 'Failed to load characters', showAll: false }))
      );
    })();
  }
}
