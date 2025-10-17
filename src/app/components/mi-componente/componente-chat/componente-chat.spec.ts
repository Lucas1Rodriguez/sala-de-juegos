import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteChat } from './componente-chat';

describe('ComponenteChat', () => {
  let component: ComponenteChat;
  let fixture: ComponentFixture<ComponenteChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
