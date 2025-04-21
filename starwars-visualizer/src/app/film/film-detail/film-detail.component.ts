import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';
import { RelatedItemsComponent } from '../../related-items/related-items.component';
import { DataViewService } from '../../services/data-view.service';
import { Character } from '../../types/character';
import { ItemService } from '../../services/rest/item.service';
import { Planet } from '../../types/planet';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, RelatedItemsComponent],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})

export class FilmDetailComponent {

  constructor(private stateService: StateService, private dataViewService: DataViewService, private itemService: ItemService) { }

  film = this.stateService.selectedFilm;

  charactersView$ = this.dataViewService.getDataView<Character>(
    this.film()?.characters ?? [],
    this.stateService.characters,
    items => this.stateService.updateItems(this.stateService.characters, items),
    url => this.itemService.getCharacterByUrl(url),
    'characters'
  );

  planetsView$ = this.dataViewService.getDataView<Planet>(
    this.film()?.planets ?? [],
    this.stateService.planets,
    items => this.stateService.updateItems(this.stateService.planets, items),
    url => this.itemService.getPlanetByUrl(url),
    'planets'
  );

}
