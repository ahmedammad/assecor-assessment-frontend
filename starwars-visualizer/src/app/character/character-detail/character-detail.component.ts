import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from "../../image-slider/image-slider.component";
import { Planet } from '../../types/planet';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FeedbackComponent } from '../../feedback/feedback.component';
import { CommonModule } from '@angular/common';
import { RelatedItemsComponent } from '../../related-items/related-items.component';
import { FilmService, FilmsView } from '../../services/film/film.service';
import { PlanetService, PlanetsView } from '../../services/planet/planet.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, FeedbackComponent, RelatedItemsComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent {

  constructor(private planetService: PlanetService, private stateService: StateService, private router: Router,
    private filmService: FilmService
  ) { }
  character = this.stateService.selectedCharacter;

  homeworldView$: Observable<PlanetsView> = this.planetService.getPlanetsView$(this.getPlanetsUrls());

  filmsView$: Observable<FilmsView> = this.filmService.getFilmsView$(this.character()?.films ?? []);

  getPlanetsUrls(): string[] {
    const homeworld = this.character()?.homeworld;
    return homeworld ? [homeworld] : [];
  }

  goToPlanet(planet: Planet): void {
    this.stateService.selectedPlanet.set(planet);
    this.router.navigate(['planets/detail']);
  }

}
