import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from '../../image-slider/image-slider.component';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [ImageSliderComponent],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss'
})
export class PlanetDetailComponent {

  private planetState = inject(StateService);
  planet = this.planetState.selectedPlanet;
}
