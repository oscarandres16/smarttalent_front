import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDestinosComponent } from './form-destinos.component';

describe('FormDestinosComponent', () => {
  let component: FormDestinosComponent;
  let fixture: ComponentFixture<FormDestinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDestinosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
