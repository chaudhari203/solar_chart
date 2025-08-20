import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monthlygeneration } from './monthlygeneration';

describe('Monthlygeneration', () => {
  let component: Monthlygeneration;
  let fixture: ComponentFixture<Monthlygeneration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monthlygeneration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Monthlygeneration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
