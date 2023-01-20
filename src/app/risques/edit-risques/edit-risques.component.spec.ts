import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRisquesComponent } from './edit-risques.component';

describe('EditRisquesComponent', () => {
  let component: EditRisquesComponent;
  let fixture: ComponentFixture<EditRisquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRisquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRisquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
