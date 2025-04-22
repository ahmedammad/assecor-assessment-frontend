import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { RelatedItemsComponent } from '../../related-items/related-items.component';
import { DataView, DataViewService } from '../../services/data-view.service';
import { ItemService } from '../../services/rest/item.service';
import { Character } from '../../types/character';
import { Film } from '../../types/film';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [ImageSliderComponent, RelatedItemsComponent],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss'
})
export class PlanetDetailComponent implements OnInit {

  constructor(private stateService: StateService, private dataViewService: DataViewService, private itemService: ItemService) { }

  planet = this.stateService.selectedPlanet;
  filmsView$!: Observable<DataView<Film>>;
  residentsView$!: Observable<DataView<Character>>;

  ngOnInit(): void {
    this.loadResidentsView();
    this.loadFilmsView();
  }

  loadResidentsView(): void {
    this.residentsView$ = this.dataViewService.getDataView<Character>(
      this.planet()?.residents ?? [],
      this.stateService.characters,
      items => this.stateService.updateItems(this.stateService.characters, items),
      url => this.itemService.getCharacterByUrl(url),
      'characters'
    );
  }

  loadFilmsView(): void {
    this.filmsView$ = this.dataViewService.getDataView<Film>(
      this.planet()?.films ?? [],
      this.stateService.films,
      items => this.stateService.updateItems(this.stateService.films, items),
      url => this.itemService.getFilmByUrl(url),
      'films'
    );
  }

}
