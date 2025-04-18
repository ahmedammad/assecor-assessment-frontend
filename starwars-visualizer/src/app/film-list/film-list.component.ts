import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, startWith, switchMap } from 'rxjs';
import { ItemService } from '../services/item.service';
import { Film } from '../types/film';


interface DataView {
  title: string;
  items: Film[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss'
})
export class FilmListComponent implements OnInit {

  dataView$!: Observable<DataView>;
  private refreshSubject = new BehaviorSubject<void>(undefined);

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.dataView$ = this.refreshSubject.asObservable().pipe(
      switchMap(() => this.fetchFilms()),
      startWith({ title: 'Films', items: [] as Film[], isLoading: true, error: null })
    );
  }

  retry(): void {
    this.refreshSubject.next();
  }

  private fetchFilms(): Observable<DataView> {
    return this.itemService.getFilms().pipe(
      map(films => ({
        title: 'Films',
        items: films,
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
        title: 'Films',
        items: [] as Film[],
        isLoading: false,
        error: errorMessage
      });
    });
  }

}
