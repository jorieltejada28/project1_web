import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingChartsComponent } from './loading-charts.component';

describe('LoadingChartsComponent', () => {
  let component: LoadingChartsComponent;
  let fixture: ComponentFixture<LoadingChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
