import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { Character } from '../../types/character';
import { ItemService } from '../../services/rest/item.service';
import { catchError, delay, forkJoin, map, Observable, of, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { RelatedItemsComponent } from '../../related-items/related-items.component';

interface CharactersView {
  items: Character[];
  isLoading: boolean;
  error: string | null;
  showAll: boolean;
}

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, RelatedItemsComponent],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})

export class FilmDetailComponent {

  constructor(private itemService: ItemService, private stateService: StateService, private router: Router) { }

  film = this.stateService.selectedFilm;

  charactersView$: Observable<CharactersView> = computed(() => {
    const film = this.film();
    if (!film || !film.characters?.length) {
      return of({ items: [], isLoading: false, error: null, showAll: false });
    }

    const characters$ = film.characters.map(url => 
      this.itemService.getCharacterByUrl(url).pipe(
        catchError(() => of(null))
      )
    );

    return forkJoin(characters$).pipe(
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
