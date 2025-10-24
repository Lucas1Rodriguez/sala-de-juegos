import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteResultadosEncuesta } from './componente-resultados-encuesta';

describe('ComponenteResultadosEncuesta', () => {
  let component: ComponenteResultadosEncuesta;
  let fixture: ComponentFixture<ComponenteResultadosEncuesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteResultadosEncuesta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteResultadosEncuesta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
