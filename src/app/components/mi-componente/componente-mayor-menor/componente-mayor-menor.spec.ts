import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteMayorMenor } from './componente-mayor-menor';

describe('ComponenteMayorMenor', () => {
  let component: ComponenteMayorMenor;
  let fixture: ComponentFixture<ComponenteMayorMenor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteMayorMenor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteMayorMenor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
