import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteQuienSoy } from './componente-quien-soy';

describe('ComponenteQuienSoy', () => {
  let component: ComponenteQuienSoy;
  let fixture: ComponentFixture<ComponenteQuienSoy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteQuienSoy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteQuienSoy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
