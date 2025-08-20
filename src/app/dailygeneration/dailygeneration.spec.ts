import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailygeneration } from './dailygeneration';

describe('Dailygeneration', () => {
  let component: Dailygeneration;
  let fixture: ComponentFixture<Dailygeneration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dailygeneration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dailygeneration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
