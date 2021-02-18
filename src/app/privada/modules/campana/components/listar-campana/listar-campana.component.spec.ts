import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCampanaComponent } from './listar-campana.component';

describe('ListarCampanaComponent', () => {
  let component: ListarCampanaComponent;
  let fixture: ComponentFixture<ListarCampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCampanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
