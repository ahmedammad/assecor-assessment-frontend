import { Component, input, output } from '@angular/core';
import { Film } from '../types/film';
import { Character } from '../types/character';
import { Planet } from '../types/planet';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  data = input<{title: string, items: Film[] | Character[] | Planet[], isLoading: boolean, error: string | null;}>();

  readonly retry = output<void>();

  triggerRetry() {
    this.retry.emit();
  }

}
