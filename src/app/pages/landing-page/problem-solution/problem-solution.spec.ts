import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSolution } from './problem-solution';

describe('ProblemSolution', () => {
  let component: ProblemSolution;
  let fixture: ComponentFixture<ProblemSolution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemSolution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemSolution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
