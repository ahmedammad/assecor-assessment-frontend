import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, of, startWith, switchMap } from 'rxjs';
import { ItemService } from '../../services/rest/item.service';
import { Character } from '../../types/character';
import { FeedbackComponent } from "../../feedback/feedback.component";
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Router } from '@angular/router';

interface DataView {
  title: string;
  items: Character[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FeedbackComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent implements OnInit {

  dataView$!: Observable<DataView>;
  private refreshSubject = new BehaviorSubject<void>(undefined);

  constructor(private itemService: ItemService, private stateService: StateService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataView$ = this.refreshSubject.asObservable().pipe(
      switchMap(() =>
        this.fetchCharacters().pipe(
          startWith({ title: 'Charaktere', items: [] as Character[], isLoading: true, error: null })
        )));
  }

  retry(): void {
    this.refreshSubject.next();
  }

  private fetchCharacters(): Observable<DataView> {
    if (this.stateService.charactersLoaded()) {
      return of({
        title: 'Charaktere', items: this.stateService.characters() ?? [], isLoading: false, error: null
      })
    }
    return this.itemService.getCharacters().pipe(
      map(characters => {
        this.stateService.characters.set(characters);
        return {
          title: 'Charaktere', items: characters, isLoading: false, error: null
        };
      }),
      delay(2000),
      catchError((error) => of({ title: 'Charaktere', items: [], isLoading: false, error: error.message }))
    );
  }

  goToDetail(character: Character): void {
    this.stateService.selectedCharacter.set(character);
    this.router.navigate(['detail'], { relativeTo: this.route });
  }

}
