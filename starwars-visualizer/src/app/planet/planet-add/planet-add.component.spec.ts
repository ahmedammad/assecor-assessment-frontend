import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetAddComponent } from './planet-add.component';

describe('PlanetAddComponent', () => {
  let component: PlanetAddComponent;
  let fixture: ComponentFixture<PlanetAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
