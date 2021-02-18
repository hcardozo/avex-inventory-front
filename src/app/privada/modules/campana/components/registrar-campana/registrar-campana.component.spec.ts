import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCampanaComponent } from './registrar-campana.component';

describe('RegistrarCampanaComponent', () => {
  let component: RegistrarCampanaComponent;
  let fixture: ComponentFixture<RegistrarCampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCampanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
