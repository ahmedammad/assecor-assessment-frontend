import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { Observable } from 'rxjs';
import { RelatedItemsComponent } from '../../related-items/related-items.component';
import { CharacterService, CharactersView } from '../../services/character/character.service';
import { PlanetService, PlanetsView } from '../../services/planet/planet.service';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, RelatedItemsComponent],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})

export class FilmDetailComponent {

  constructor(private planetService: PlanetService, private stateService: StateService, private characterService: CharacterService) { }

  film = this.stateService.selectedFilm;

  charactersView$: Observable<CharactersView> = this.characterService.getCharactersView$(this.film()?.characters ?? []);

  planetsView$: Observable<PlanetsView> = this.planetService.getPlanetsView$(this.film()?.planets ?? []);

}
