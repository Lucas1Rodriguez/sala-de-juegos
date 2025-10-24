import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteResultadosJuegos } from './componente-resultados-juegos';

describe('ComponenteResultadosJuegos', () => {
  let component: ComponenteResultadosJuegos;
  let fixture: ComponentFixture<ComponenteResultadosJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteResultadosJuegos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteResultadosJuegos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
