import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ImageSliderComponent } from "../../image-slider/image-slider.component";

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [ImageSliderComponent],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent {


  private characterState = inject(StateService);
  character = this.characterState.selectedCharacter;

}
