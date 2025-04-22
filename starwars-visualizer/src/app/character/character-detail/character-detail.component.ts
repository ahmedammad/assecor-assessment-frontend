import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from "../../image-slider/image-slider.component";
import { Planet } from '../../types/planet';
import { Router } from '@angular/router';
import { FeedbackComponent } from '../../feedback/feedback.component';
import { CommonModule } from '@angular/common';
import { RelatedItemsComponent } from '../../related-items/related-items.component';
import { ItemService } from '../../services/rest/item.service';
import { DataView, DataViewService } from '../../services/data-view.service';
import { Film } from '../../types/film';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, FeedbackComponent, RelatedItemsComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent implements OnInit {

  constructor(private stateService: StateService, private router: Router,
    private dataViewService: DataViewService, private itemService: ItemService
  ) { }

  character = this.stateService.selectedCharacter;
  filmsView$!: Observable<DataView<Film>>;
  homeworldView$!: Observable<DataView<Planet>>;

  ngOnInit(): void {
    this.loadHomeworldView();
    this.loadFilmsView();
  }

  loadHomeworldView(): void {
    this.homeworldView$ = this.dataViewService.getDataView<Planet>(
      this.getPlanetsUrls(),
      this.stateService.planets,
      items => this.stateService.updateItems(this.stateService.planets, items),
      url => this.itemService.getPlanetByUrl(url),
      'planets'
    );
  }

  loadFilmsView(): void {
    this.filmsView$ = this.dataViewService.getDataView<Film>(
      this.character()?.films ?? [],
      this.stateService.films,
      items => this.stateService.updateItems(this.stateService.films, items),
      url => this.itemService.getFilmByUrl(url),
      'films'
    );
  }
  getPlanetsUrls(): string[] {
    const homeworld = this.character()?.homeworld;
    return homeworld ? [homeworld] : [];
  }

  goToPlanet(planet: Planet): void {
    this.stateService.selectedPlanet.set(planet);
    this.router.navigate(['planets/detail']);
  }

}
