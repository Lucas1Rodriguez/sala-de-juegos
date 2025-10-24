import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteBolita } from './componente-bolita';

describe('ComponenteBolita', () => {
  let component: ComponenteBolita;
  let fixture: ComponentFixture<ComponenteBolita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteBolita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteBolita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
