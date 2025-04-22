import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-film-add',
  standalone: true,
  imports: [],
  templateUrl: './film-add.component.html',
  styleUrl: './film-add.component.scss'
})
export class FilmAddComponent {

  dialogRef = inject(MatDialogRef<FilmAddComponent>);

}
