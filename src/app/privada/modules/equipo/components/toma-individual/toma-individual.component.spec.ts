import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaIndividualComponent } from './toma-individual.component';

describe('TomaIndividualComponent', () => {
  let component: TomaIndividualComponent;
  let fixture: ComponentFixture<TomaIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomaIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
