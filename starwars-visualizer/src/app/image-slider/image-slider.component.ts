import { Component, signal, input, computed } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})

export class ImageSliderComponent {
  readonly images = input<string[]>(); 

  currentIndex = signal(0);

  readonly currentImage = computed(() => this.images()?.[this.currentIndex()] ?? '');

  selectImage(index: number): void {
    this.currentIndex.set(index);
  }

}