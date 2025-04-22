import { Component, input, output } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../types/film';
import { Character } from '../types/character';
import { FeedbackComponent } from '../feedback/feedback.component';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';
import { Planet } from '../types/planet';
import { MatDialog } from '@angular/material/dialog';
import { FilmAddComponent } from '../film/film-add/film-add.component';
import { CharacterAddComponent } from '../character/character-add/character-add.component';
import { PlanetAddComponent } from '../planet/planet-add/planet-add.component';

interface DataView {
  items: (Film | Character | Planet)[];
  isLoading: boolean;
  error: string | null;
  showAll: boolean;
}

@Component({
  selector: 'app-related-items',
  standalone: true,
  imports: [CommonModule, FeedbackComponent],
  templateUrl: './related-items.component.html',
  styleUrl: './related-items.component.scss'
})
export class RelatedItemsComponent {

  constructor(private dialog: MatDialog, private stateService: StateService, private router: Router) {}

  title = input.required<string>();
  dataView$ = input.required<Observable<DataView>>();

  readonly retry = output<void>();

  toggleShowAll(dataView: DataView): void {
    dataView.showAll = true;
  }

  onItemClick(item: Film | Character | Planet) {
    if(this.isFilm(item)) this.goToFilm(item);
    if(this.isCharacter(item)) this.goToCharacter(item);
    if(this.isPlanet(item)) this.goToPlanet(item);
  }

  goToFilm(film: Film): void {
    const tmpFilm: Film = {
      ...film,
      opening_crawl: film.opening_crawl.replace(/(\r\n)/g, ' ')
    };
    this.stateService.selectedFilm.set(tmpFilm);
    this.router.navigate(['films/detail']);
  }

  goToCharacter(character: Character): void {
    this.stateService.selectedCharacter.set(character);
    this.router.navigate(['characters/detail']);
  }

  goToPlanet(planet: Planet): void {
    this.stateService.selectedPlanet.set(planet);
    this.router.navigate(['planets/detail']);
  }

  addItem(item: Film | Character | Planet): void {
    let component;
    if (this.isFilm(item)) component = FilmAddComponent;
    if (this.isCharacter(item)) component = CharacterAddComponent;
    if (this.isPlanet(item)) component = PlanetAddComponent;

    if (component) this.dialog.open(component, {
      backdropClass: 'app-backdrop',
    });
  }

  isFilm(item: Film | Character | Planet): item is Film {
    return ('title' in item && 'episode_id' in item && 'opening_crawl' in item);
  }

  isCharacter(item: Film | Character | Planet): item is Character {
    return ('name' in item && 'height' in item && 'mass' in item);
  }

  isPlanet(item: Film | Character | Planet): item is Planet {
    return ('name' in item && 'rotation_period' in item && 'gravity' in item);
  }

}
