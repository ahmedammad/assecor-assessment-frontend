import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { RelatedItemsComponent } from '../../related-items/related-items.component';
import { Observable } from 'rxjs';
import { FilmService, FilmsView } from '../../services/film/film.service';
import { CharacterService, CharactersView } from '../../services/character/character.service';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [ImageSliderComponent, RelatedItemsComponent],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss'
})
export class PlanetDetailComponent {

  constructor(private characterService: CharacterService, private stateService: StateService, private filmService: FilmService) { }

  planet = this.stateService.selectedPlanet;

  residentsView$: Observable<CharactersView> = this.characterService.getCharactersView$(this.planet()?.residents ?? []);

  filmsView$: Observable<FilmsView> = this.filmService.getFilmsView$(this.planet()?.films ?? []);

}
