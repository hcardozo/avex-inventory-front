import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaMasivaComponent } from './toma-masiva.component';

describe('TomaMasivaComponent', () => {
  let component: TomaMasivaComponent;
  let fixture: ComponentFixture<TomaMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomaMasivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
