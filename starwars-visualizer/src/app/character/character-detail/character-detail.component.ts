import { Component, computed } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from "../../image-slider/image-slider.component";
import { Film } from '../../types/film';
import { Planet } from '../../types/planet';
import { catchError, delay, forkJoin, map, Observable, of, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { ItemService } from '../../services/rest/item.service';
import { FeedbackComponent } from '../../feedback/feedback.component';
import { CommonModule } from '@angular/common';
import { RelatedItemsComponent } from '../../related-items/related-items.component';

interface HomeworldView {
  items: Planet[];
  isLoading: boolean;
  error: string | null;
}

interface FilmsView {
  items: Film[];
  isLoading: boolean;
  error: string | null;
  showAll: boolean;
}

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, FeedbackComponent, RelatedItemsComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent {

  constructor(private itemService: ItemService, private stateService: StateService, private router: Router) { }
  character = this.stateService.selectedCharacter;

  homeworldView$: Observable<HomeworldView> = computed(() => {
    const character = this.character();
    if (!character || !character.homeworld) {
      return of({ items: [], isLoading: false, error: null });
    }

    return this.itemService.getPlanetByUrl(character.homeworld).pipe(
      map(planet => ({ items: [planet], isLoading: false, error: null })),
      delay(2000),
      startWith({ items: [], isLoading: true, error: null }),
      catchError(() => of({ items: [], isLoading: false, error: 'Failed to load homeworld' }))
    );
  })();

  filmsView$: Observable<FilmsView> = computed(() => {
    const character = this.character();
    if (!character || !character.films?.length) {
      return of({ items: [], isLoading: false, error: null, showAll: false });
    }

    const filmObservables = character.films.map(url =>
      this.itemService.getFilmByUrl(url).pipe(
        catchError(() => of(null))
      )
    );

    return forkJoin(filmObservables).pipe(
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

  goToPlanet(planet: Planet): void {
    this.stateService.selectedPlanet.set(planet);
    this.router.navigate(['planets/detail']);
  }

}
