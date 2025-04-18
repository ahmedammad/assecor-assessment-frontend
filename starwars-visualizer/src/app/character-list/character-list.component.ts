import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, startWith, switchMap } from 'rxjs';
import { ItemService } from '../services/item.service';
import { Character } from '../types/character';


interface DataView {
  title: string;
  items: Character[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent implements OnInit {

  dataView$!: Observable<DataView>;
  private refreshSubject = new BehaviorSubject<void>(undefined);

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.dataView$ = this.refreshSubject.asObservable().pipe(
      switchMap(() => this.fetchCharacters()),
      startWith({ title: 'Charaktere', items: [] as Character[], isLoading: true, error: null })
    );
  }

  retry(): void {
    this.refreshSubject.next();
  }

  private fetchCharacters(): Observable<DataView> {
    return this.itemService.getCharacters().pipe(
      map(characters => ({
        title: 'Charaktere',
        items: characters,
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
        title: 'Charaktere',
        items: [] as Character[],
        isLoading: false,
        error: errorMessage
      });
    });
  }

}
