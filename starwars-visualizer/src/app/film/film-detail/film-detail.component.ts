import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})

export class FilmDetailComponent {

  private filmState = inject(StateService);
  film = this.filmState.selectedFilm;

}
