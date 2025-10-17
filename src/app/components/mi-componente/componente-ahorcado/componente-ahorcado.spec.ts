import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteAhorcado } from './componente-ahorcado';

describe('ComponenteAhorcado', () => {
  let component: ComponenteAhorcado;
  let fixture: ComponentFixture<ComponenteAhorcado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteAhorcado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteAhorcado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
