import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, of, startWith, switchMap } from 'rxjs';
import { ItemService } from '../../services/rest/item.service';
import { Film } from '../../types/film';
import { FeedbackComponent } from '../../feedback/feedback.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';

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
      switchMap(() =>
        this.fetchFilms().pipe(
          startWith({ title: 'Filme', items: [], isLoading: true, error: null })
        )));
  }

  retry(): void {
    this.refreshSubject.next();
  }

  private fetchFilms(): Observable<DataView> {
    if (this.stateService.filmsLoaded()) {
      return of({
        title: 'Filme', items: this.stateService.films() ?? [], isLoading: false, error: null
      })
    }

    return this.itemService.getFilms().pipe(
      map(films => {
        this.stateService.films.set(films);
        this.stateService.filmsLoaded.set(true);
        return {
          title: 'Filme', items: films, isLoading: false, error: null
        };
      }),
      delay(2000), // just to see the spinner , dont need it
      catchError((error) => of({ title: 'Filme', items: [], isLoading: false, error: error.message }))
    );
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
