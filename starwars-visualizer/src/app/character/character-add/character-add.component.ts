import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-character-add',
  standalone: true,
  imports: [],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.scss'
})
export class CharacterAddComponent {

  dialogRef = inject(MatDialogRef<CharacterAddComponent>);

}
