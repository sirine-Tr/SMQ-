import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReclamtionComponent } from './details-reclamtion.component';

describe('DetailsReclamtionComponent', () => {
  let component: DetailsReclamtionComponent;
  let fixture: ComponentFixture<DetailsReclamtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReclamtionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReclamtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
