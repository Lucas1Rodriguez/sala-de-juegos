import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteEncuesta } from './componente-encuesta';

describe('ComponenteEncuesta', () => {
  let component: ComponenteEncuesta;
  let fixture: ComponentFixture<ComponenteEncuesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteEncuesta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteEncuesta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
