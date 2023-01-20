import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRisquesComponent } from './list-risques.component';

describe('ListRisquesComponent', () => {
  let component: ListRisquesComponent;
  let fixture: ComponentFixture<ListRisquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRisquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRisquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
