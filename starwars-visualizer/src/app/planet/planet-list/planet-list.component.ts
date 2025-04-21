import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, of, startWith, switchMap } from 'rxjs';
import { ItemService } from '../../services/rest/item.service';
import { FeedbackComponent } from '../../feedback/feedback.component';
import { Planet } from '../../types/planet';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private itemService: ItemService, private stateService: StateService, private router: Router, private route: ActivatedRoute) { }

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
    if (this.stateService.planets()) {
      return of({
        title: 'Planeten', items: this.stateService.planets() ?? [], isLoading: false, error: null
      })
    }
    return this.itemService.getPlanets().pipe(
      map(planets => {
        this.stateService.planets.set(planets);
        return {
          title: 'Planeten', items: planets, isLoading: false, error: null
        };
      }),
      delay(2000),
      catchError((error) => of({ title: 'Planeten', items: [], isLoading: false, error: error.message }))
    );
  }

  goToDetail(planet: Planet): void {

    this.stateService.selectedPlanet.set(planet);
    this.router.navigate(['detail'], { relativeTo: this.route });
  }
}
