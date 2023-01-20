import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRisqueComponent } from './details-risque.component';

describe('DetailsRisqueComponent', () => {
  let component: DetailsRisqueComponent;
  let fixture: ComponentFixture<DetailsRisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRisqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
