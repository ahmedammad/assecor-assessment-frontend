import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, startWith, switchMap } from 'rxjs';
import { ItemService } from '../services/rest/item.service';
import { FeedbackComponent } from '../feedback/feedback.component';
import { Planet } from '../types/planet';


interface DataView {
  title: string;
  items: Planet[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule, FeedbackComponent],
  templateUrl: './planet-list.component.html',
  styleUrl: './planet-list.component.scss'
})
export class PlanetListComponent implements OnInit {

  dataView$!: Observable<DataView>;
  private refreshSubject = new BehaviorSubject<void>(undefined);

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.dataView$ = this.refreshSubject.asObservable().pipe(
      switchMap(() => this.fetchPlanets()),
      startWith({ title: 'Planeten', items: [] as Planet[], isLoading: true, error: null })
    );
  }

  retry(): void {
    this.refreshSubject.next();
  }

  private fetchPlanets(): Observable<DataView> {
    return this.itemService.getPlanets().pipe(
      map(planets => ({
        title: 'Planeten',
        items: planets,
        isLoading: false,
        error: null
      })),
      delay(2000), // just to see the spinner , dont need it
      catchError(error => this.createErrorViewModel(error.message))
    );
  }

  private createErrorViewModel(errorMessage: string): Observable<DataView> {
    return new Observable(subscriber => {
      subscriber.next({
        title: 'Planeten',
        items: [] as Planet[],
        isLoading: false,
        error: errorMessage
      });
    });
  }

}
