import { Component, inject } from '@angular/core';
import { Film } from '../types/film';
import { CommonModule } from '@angular/common';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})

export class FilmDetailComponent {

  private filmState = inject(StateService);
  film = this.filmState.selectedFilm;

}
