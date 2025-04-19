import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, startWith, switchMap } from 'rxjs';
import { ItemService } from '../services/rest/item.service';
import { Film } from '../types/film';
import { FeedbackComponent } from '../feedback/feedback.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../services/state.service';


interface DataView {
  title: string;
  items: Film[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule, FeedbackComponent],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss'
})
export class FilmListComponent implements OnInit {

  dataView$!: Observable<DataView>;
  private refreshSubject = new BehaviorSubject<void>(undefined);

  constructor(private itemService: ItemService, private stateService: StateService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataView$ = this.refreshSubject.asObservable().pipe(
      switchMap(() => this.fetchFilms()),
      startWith({ title: 'Filme', items: [] as Film[], isLoading: true, error: null })
    );
  }

  retry(): void {
    this.refreshSubject.next();
  }

  private fetchFilms(): Observable<DataView> {
    return this.itemService.getFilms().pipe(
      map(films => ({
        title: 'Filme',
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
        title: 'Filme',
        items: [] as Film[],
        isLoading: false,
        error: errorMessage
      });
    });
  }

  goToDetail(film: Film): void {
    const tmpFilm: Film = {
      ...film,
      opening_crawl: film.opening_crawl.replace(/(\r\n)/g, ' ')
    };

    this.stateService.selectedFilm.set(tmpFilm);
    this.router.navigate(['detail'], { relativeTo: this.route });
  }

}
