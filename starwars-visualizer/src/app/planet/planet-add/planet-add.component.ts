import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-planet-add',
  standalone: true,
  imports: [],
  templateUrl: './planet-add.component.html',
  styleUrl: './planet-add.component.scss'
})
export class PlanetAddComponent {

  dialogRef = inject(MatDialogRef<PlanetAddComponent>);

}
